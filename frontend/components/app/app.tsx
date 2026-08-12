'use client';

import { useMemo } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { getSandboxTokenSource } from '@/lib/utils';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();

  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string'
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint('/api/token');
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />

      <main className="relative min-h-svh overflow-hidden bg-[#020617] text-white">

        {/* ================= BACKGROUND ================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Main blue/purple glow */}
          <div
            className="absolute left-1/2 top-[-180px] h-[500px] w-[700px]
            -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]
            animate-pulse"
          />

          <div
            className="absolute bottom-[-220px] left-[-120px] h-[500px] w-[500px]
            rounded-full bg-cyan-500/10 blur-[130px]"
          />

          <div
            className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px]
            rounded-full bg-purple-600/10 blur-[130px]"
          />

          {/* Tech grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99,102,241,0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99,102,241,0.35) 1px, transparent 1px)
              `,
              backgroundSize: '55px 55px',
            }}
          />

          {/* Floating tech symbols */}
          <div className="absolute left-[10%] top-[20%] text-4xl opacity-10 animate-bounce">
            ⚡
          </div>

          <div className="absolute right-[13%] top-[25%] text-4xl opacity-10 animate-pulse">
            🤖
          </div>

          <div className="absolute left-[18%] bottom-[22%] text-3xl opacity-10 animate-pulse">
            🧠
          </div>

          <div className="absolute right-[18%] bottom-[20%] text-3xl opacity-10 animate-bounce">
            ☁️
          </div>

          <div className="absolute left-[45%] top-[12%] text-2xl opacity-10 animate-pulse">
            AI
          </div>
        </div>

        {/* ================= TOP BRANDING ================= */}

        <div className="absolute left-6 top-6 z-20">

          <div className="flex items-center gap-3">

            <div
              className="flex h-11 w-11 items-center justify-center
              rounded-xl border border-indigo-400/30
              bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
            >
              🤖
            </div>

            <div>
              <div className="text-sm font-bold tracking-widest text-white">
                Learn<span className="text-indigo-400">Mate</span>
              </div>

              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Intelligent Voice Agent
              </div>
            </div>

          </div>
        </div>

        {/* ================= TECH STATUS CARD ================= */}

        <div
          className="
            absolute right-6 top-6 z-20 hidden
            w-[250px] rounded-2xl
            border border-white/10
            bg-white/[0.04]
            p-4
            shadow-2xl shadow-indigo-950/30
            backdrop-blur-xl
            md:block
          "
        >

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-semibold text-slate-300">
                SYSTEM ONLINE
              </span>
            </div>

            <span className="text-xs text-slate-600">
              v2.0
            </span>

          </div>

          <div className="space-y-2">

            <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
              <span className="text-xs text-slate-400">
                🎙️ Speech
              </span>
              <span className="text-xs text-emerald-400">
                Ready
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
              <span className="text-xs text-slate-400">
                🧠 Intelligence
              </span>
              <span className="text-xs text-indigo-400">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
              <span className="text-xs text-slate-400">
                ⚡ LiveKit
              </span>
              <span className="text-xs text-cyan-400">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
              <span className="text-xs text-slate-400">
                🔊 Murf Falcon
              </span>
              <span className="text-xs text-purple-400">
                TTS
              </span>
            </div>

          </div>

        </div>

        {/* ================= FLOATING AI CARD ================= */}

        <div
          className="
            pointer-events-none absolute
            bottom-8 left-6 z-10 hidden
            w-[220px]
            rounded-2xl
            border border-white/10
            bg-white/[0.035]
            p-4
            backdrop-blur-xl
            md:block
          "
        >

          <div className="mb-3 flex items-center gap-3">

            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-indigo-400/30
                bg-indigo-500/10
                text-lg
              "
            >
              ⚡
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Real-time AI
              </p>

              <p className="text-[10px] text-slate-500">
                Voice intelligence
              </p>
            </div>

          </div>

          {/* Animated waveform */}
          <div className="flex h-8 items-center justify-center gap-1">

            <span className="h-2 w-1 rounded-full bg-indigo-400 animate-pulse" />
            <span className="h-5 w-1 rounded-full bg-indigo-400 animate-pulse [animation-delay:100ms]" />
            <span className="h-8 w-1 rounded-full bg-cyan-400 animate-pulse [animation-delay:200ms]" />
            <span className="h-4 w-1 rounded-full bg-indigo-400 animate-pulse [animation-delay:300ms]" />
            <span className="h-6 w-1 rounded-full bg-purple-400 animate-pulse [animation-delay:400ms]" />
            <span className="h-3 w-1 rounded-full bg-indigo-400 animate-pulse [animation-delay:500ms]" />
            <span className="h-7 w-1 rounded-full bg-cyan-400 animate-pulse [animation-delay:600ms]" />

          </div>

        </div>

        {/* ================= EXISTING LIVEKIT UI ================= */}

        <div className="relative z-10 grid min-h-svh grid-cols-1 place-content-center">
          <ViewController appConfig={appConfig} />
        </div>

        {/* ================= AUDIO PERMISSION ================= */}

        <StartAudioButton label="Start Audio" />

        {/* ================= FOOTER ================= */}

        <div
          className="
            pointer-events-none absolute
            bottom-4 left-1/2 z-20
            -translate-x-1/2
            text-center
          "
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">
            Powered by
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            LiveKit • Murf Falcon • AI
          </p>
        </div>

      </main>

      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}

