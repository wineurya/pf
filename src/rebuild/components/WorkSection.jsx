import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";

function AvanceCard() {
  return (
    <article className="flex h-auto min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,165,116,0)] sm:h-[660px]">
      <div className="relative h-[320px] shrink-0 overflow-hidden sm:h-[558px]">
        <div className="absolute left-1/2 top-1/2 h-[562px] w-[649px] max-w-none -translate-x-1/2 -translate-y-1/2">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden opacity-60">
              <img
                src={REBUILD_ASSETS.avanceBackdrop}
                alt=""
                className="absolute left-[-41.56%] top-[-105.35%] h-[211.57%] w-[183.27%] max-w-none object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[80.147%] to-white to-[97.874%]" />
          </div>
        </div>
        <div className="absolute left-[-24px] right-[-22.5px] top-1/2 aspect-[645/558] -translate-y-1/2">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={REBUILD_ASSETS.avancePhones}
              alt="Avance product mockups"
              className="absolute left-[17.63%] top-[13.08%] h-[78.5%] w-[64.75%] max-w-none object-contain"
            />
          </div>
        </div>
      </div>
      <footer className="flex flex-col px-6 pb-6 pt-[26px]">
        <div className="flex flex-col gap-2">
          <div className="relative h-6 w-32">
            <div className="absolute left-0 top-1/2 size-6 -translate-y-1/2 overflow-hidden rounded-[3.11px]">
              <div className="flex aspect-square h-full flex-col overflow-hidden bg-gradient-to-b from-[#f0e4d0] to-[#d4a574]">
                <img src={REBUILD_ASSETS.avanceMarkVector} alt="" className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2" width={16} height={16} />
              </div>
            </div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[#171717]">
              Avance
            </div>
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[rgba(81,69,62,0.82)]">
            Coaching when you slow down.
          </p>
        </div>
      </footer>
    </article>
  );
}

function ChatBubble({ align, dark, shadow, children }) {
  const rowCls = align === "end" ? "items-end" : "items-start";
  const bubbleBase =
    "flex max-w-full items-center justify-center overflow-hidden rounded-[32px] border px-4 py-2 backdrop-blur-[6px]";
  const bubble =
    dark === true
      ? `${bubbleBase} border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[rgba(25,25,29,0.79)] to-[rgba(10,7,22,0.79)] text-white`
      : `${bubbleBase} border-[rgba(102,102,102,0.08)] bg-white text-[#323232]`;
  return (
    <div className={clsRow(rowCls)}>
      <div className={shadow ? `${bubble} shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]` : bubble}>{children}</div>
    </div>
  );
}

function clsRow(rowCls) {
  return `flex w-full max-w-[429px] flex-col justify-center ${rowCls}`;
}

function IncityCard() {
  return (
    <article className="flex h-auto min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(0,132,255,0)] sm:h-[660px]">
      <div className="relative h-[320px] shrink-0 overflow-hidden sm:h-[558px]">
        <div className="absolute left-1/2 top-1/2 h-[558px] w-[746px] max-w-none -translate-x-1/2 -translate-y-1/2">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden opacity-[0.64]">
              <img
                src={REBUILD_ASSETS.incityBackdrop}
                alt=""
                className="absolute left-[-30.5%] top-[-1.34%] h-[106.99%] w-[142.67%] max-w-none object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[80.147%] to-white to-[97.874%]" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex w-[min(100%,429px)] -translate-x-1/2 -translate-y-1/2 flex-col justify-end gap-4 px-3">
          <ChatBubble align="start" dark={true}>
            <p className="m-0 text-right text-[16px] font-semibold leading-[21px] tracking-[-0.4px]">
              <span className="text-[rgba(255,255,255,0.48)]">See a </span>
              <span className="font-[family-name:var(--font-body)] text-white">city problem?</span>
            </p>
          </ChatBubble>
          <ChatBubble align="end" dark={false}>
            <p className="m-0 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[21px] tracking-[-0.4px] text-[#323232]">
              All the time!
            </p>
          </ChatBubble>
          <ChatBubble align="start" dark={true} shadow={true}>
            <p className="m-0 text-right text-[16px] font-semibold leading-[21px] tracking-[-0.4px]">
              <span className="text-[rgba(255,255,255,0.48)]">Waiting on </span>
              <span className="font-[family-name:var(--font-body)] text-white">city updates?</span>
            </p>
          </ChatBubble>
          <ChatBubble align="end" dark={false} shadow={true}>
            <p className="m-0 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[21px] tracking-[-0.4px] text-[#323232]">
              Yes! So annoying!
            </p>
          </ChatBubble>
          <ChatBubble align="start" dark={true}>
            <p className="m-0 text-right text-[16px] font-semibold leading-[21px] tracking-[-0.4px]">
              <span className="font-[family-name:var(--font-body)] text-[rgba(255,255,255,0.48)]">Wish</span>
              <span className="font-[family-name:var(--font-body)] text-white"> reporting </span>
              <span className=" font-[family-name:var(--font-body)] text-[rgba(255,255,255,0.48)]">was </span>
              <span className="font-[family-name:var(--font-body)] text-white">simpler?</span>
            </p>
          </ChatBubble>
          <ChatBubble align="end" dark={false}>
            <p className="m-0 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[21px] tracking-[-0.4px] text-[#323232]">
              Tell me you have a solution!
            </p>
          </ChatBubble>
        </div>
      </div>
      <footer className="flex flex-col px-6 pb-6 pt-[26px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex size-6 items-center justify-center overflow-hidden rounded-[3.11px]">
              <img src={REBUILD_ASSETS.incityMark} alt="" className="size-6 object-cover" width={24} height={24} />
            </div>
            <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[#171717]">
              InCity
            </span>
            <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[rgba(102,102,102,0.4)]">
              ATL311
            </span>
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[#666]">
            Mobile-first civic reporting for Atlanta.
          </p>
        </div>
      </footer>
    </article>
  );
}

function IncomingCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-[rgba(212,165,116,0)]">
      <footer className="flex flex-col px-6 pb-6 pt-[26px]">
        <div className="flex flex-col gap-2">
          <div className="relative h-6 w-full min-w-[12rem]">
            <div className="absolute left-0 top-1/2 size-6 -translate-y-1/2 rounded-[3.11px] bg-[#bcbcbc]" aria-hidden />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[#171717]">
              Incoming Project
            </div>
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[rgba(81,69,62,0.82)]">
            Needs visuals
          </p>
        </div>
      </footer>
    </article>
  );
}

export function WorkSection() {
  return (
    <section
      id="rebuild-work"
      className="scroll-mt-[7rem] border-0 border-transparent outline-none"
      aria-labelledby="rebuild-work-heading"
    >
      <h2 id="rebuild-work-heading" className="sr-only">
        Selected work
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
        <AvanceCard />
        <IncityCard />
        <IncomingCard />
        <IncomingCard />
      </div>
    </section>
  );
}
