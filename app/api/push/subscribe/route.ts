import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for direct DB access (no auth required)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { subscription, advisorId, userAgent } = await request.json();
    
    console.log('[Push Subscribe] Received subscription for advisor:', advisorId);

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
    }

    // Extract keys from subscription
    const keys = subscription.keys || {};
    
    // Upsert subscription (update if endpoint exists, insert if not)
    const { data, error } = await supabase
      .from('push_subscriptions')
      .upsert({
        advisor_id: advisorId || null,
        endpoint: subscription.endpoint,
        p256dh: keys.p256dh || '',
        auth: keys.auth || '',
        user_agent: userAgent || '',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'endpoint'
      })
      .select()
      .single();

    if (error) {
      console.error('[Push Subscribe] DB error:', error);
      // If table doesn't exist, return success anyway (graceful degradation)
      if (error.code === '42P01') {
        return NextResponse.json({ 
          success: true,
          message: 'Table not ready - run supabase-push-subscriptions.sql'
        });
      }
      throw error;
    }

    console.log('[Push Subscribe] Subscription saved:', data?.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[Push Subscribe] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to save subscription',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
