import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { subscription } = await request.json();
    
    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
    }

    console.log('[Push Unsubscribe] Removing subscription:', subscription.endpoint);

    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', subscription.endpoint);

    if (error) {
      console.error('[Push Unsubscribe] DB error:', error);
      // Graceful degradation if table doesn't exist
      if (error.code === '42P01') {
        return NextResponse.json({ success: true, message: 'Table not ready' });
      }
      throw error;
    }

    console.log('[Push Unsubscribe] Subscription removed');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Push Unsubscribe] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to remove subscription',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
