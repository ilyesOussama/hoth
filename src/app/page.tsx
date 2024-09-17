'use client';

import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useSession } from '@/hooks/use-session';
import { signOut } from '@hono/auth-js/react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { status, session } = useSession();

  if (status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {JSON.stringify(session)}
      <Button variant="outline" className="w-full" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
