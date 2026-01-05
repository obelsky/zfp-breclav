import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for direct DB access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { title, body, url, leadId } = await request.json();
    
    console.log('[Push Send] Sending notification:', { title, body, url, leadId });

    // Get all active subscriptions
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*');

    if (error) {
      console.error('[Push Send] DB error:', error);
      // If table doesn't exist, return gracefully
      if (error.code === '42P01') {
        return NextResponse.json({ 
          success: true,
          message: 'Push table not ready - run supabase-push-subscriptions.sql',
          sent: 0 
        });
      }
      throw error;
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

    // Check if VAPID keys are configured
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.log('[Push Send] VAPID keys not configured - notifications queued but not sent');
      return NextResponse.json({ 
        success: true,
        message: 'VAPID keys not configured - see VAPID_SETUP.md',
        subscriptions: subscriptions.length,
        sent: 0,
        note: 'Configure VAPID_PRIVATE_KEY in environment variables'
      });
    }

    // TODO: Implement web-push when VAPID keys are ready
    // const webpush = require('web-push');
    // webpush.setVapidDetails(
    //   'mailto:your-email@example.com',
    //   vapidPublicKey,
    //   vapidPrivateKey
    // );
    //
    // const payload = JSON.stringify({ title, body, url, leadId });
    // const results = await Promise.allSettled(
    //   subscriptions.map(sub => 
    //     webpush.sendNotification({
    //       endpoint: sub.endpoint,
    //       keys: { p256dh: sub.p256dh, auth: sub.auth }
    //     }, payload)
    //   )
    // );
    //
    // const sent = results.filter(r => r.status === 'fulfilled').length;

    return NextResponse.json({ 
      success: true,
      message: 'Push notifications ready to send',
      subscriptions: subscriptions.length,
      sent: 0, // Will be actual count when web-push is implemented
      note: 'Web-push implementation pending'
    });
  } catch (error) {
    console.error('[Push Send] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to send notifications',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
