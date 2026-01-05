import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { title, body, url, leadId } = await request.json();
    
    console.log('[Push Send] Starting...', { title, body, url, leadId });

    // Check VAPID keys first
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.error('[Push Send] VAPID keys missing!');
      return NextResponse.json({ 
        success: false,
        error: 'VAPID keys not configured',
        sent: 0
      }, { status: 500 });
    }

    // Configure web-push
    webpush.setVapidDetails(
      'mailto:Obelsky@gmail.com',
      vapidPublicKey,
      vapidPrivateKey
    );

    // Get all subscriptions
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*');

    if (error) {
      console.error('[Push Send] DB error:', error);
      return NextResponse.json({ 
        success: false,
        error: 'Database error: ' + error.message,
        sent: 0 
      }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('[Push Send] No subscriptions found');
      return NextResponse.json({ 
        success: true,
        message: 'No active subscriptions',
        sent: 0 
      });
    }

    console.log('[Push Send] Found', subscriptions.length, 'subscriptions');

    // Prepare payload
    const payload = JSON.stringify({
      title: title || '🔔 Nová poptávka',
      body: body || 'Máte novou poptávku v CRM',
      icon: '/android-chrome-192x192.png',
      url: url || '/crm/leads',
      leadId: leadId,
      timestamp: Date.now()
    });

    // Send to all subscriptions
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          };

          console.log('[Push Send] Sending to:', sub.endpoint.substring(0, 50) + '...');
          
          await webpush.sendNotification(pushSubscription, payload);
          console.log('[Push Send] ✅ Sent successfully');
          return { success: true, endpoint: sub.endpoint };
        } catch (err: any) {
          console.error('[Push Send] ❌ Failed:', err.message);
          
          // If subscription is expired/invalid, remove it
          if (err.statusCode === 404 || err.statusCode === 410) {
            console.log('[Push Send] Removing expired subscription');
            await supabase
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
          }
          
          return { success: false, endpoint: sub.endpoint, error: err.message };
        }
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled' && (r.value as any).success).length;
    const failed = results.length - sent;

    console.log('[Push Send] Complete:', { sent, failed, total: results.length });

    return NextResponse.json({ 
      success: true,
      message: `Push notifications sent`,
      sent,
      failed,
      total: subscriptions.length
    });
  } catch (error) {
    console.error('[Push Send] Error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to send notifications',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
