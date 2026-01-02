import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { title, body, url, leadId, icon, badge } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    // Get all active subscriptions
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('subscription, user_id');

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return NextResponse.json({ 
        success: false,
        message: 'Push subscriptions table not ready yet',
        error: error.message 
      }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ 
        success: true,
        message: 'No active subscriptions',
        sent: 0 
      });
    }

    // In production, you would use web-push library here to send notifications
    // For now, we'll just log and return success
    console.log('Would send push notification to', subscriptions.length, 'subscribers');
    console.log('Notification:', { title, body, url, leadId });

    // TODO: Implement actual push sending with web-push
    // const webpush = require('web-push');
    // webpush.setVapidDetails(...);
    // await Promise.all(subscriptions.map(sub => 
    //   webpush.sendNotification(sub.subscription, JSON.stringify({...}))
    // ));

    return NextResponse.json({ 
      success: true,
      message: 'Push notifications queued',
      sent: subscriptions.length,
      // Remove in production:
      note: 'VAPID keys not configured - see VAPID_SETUP.md'
    });
  } catch (error) {
    console.error('Error sending push notifications:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
