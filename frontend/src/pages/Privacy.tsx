import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. 取得する情報",
    children: (
      <>
        <p>
          当サイトでは、お問い合わせフォームの送信時に、以下の情報を取得します。
        </p>
        <ul>
          <li>お名前</li>
          <li>メールアドレス</li>
          <li>お問い合わせ本文</li>
        </ul>
        <p>
          また、サイトの安定運用に必要な範囲で、アクセス日時や利用環境などの情報が
          サーバーのログとして記録される場合があります。
        </p>
      </>
    ),
  },
  {
    title: "2. 利用目的",
    children: (
      <p>
        取得した情報は、お問い合わせへの返信、必要な連絡、および当サイトの運営・改善のために利用します。
        取得した情報を、利用目的以外で利用したり、サイト上で公開したりすることはありません。
      </p>
    ),
  },
  {
    title: "3. 外部サービスの利用",
    children: (
      <p>
        お問い合わせの送信には、EmailJS などの外部サービスを利用しています。送信された情報は、
        お問い合わせへの対応に必要な範囲で、これらのサービスを経由して取り扱われます。
        各サービスにおける情報の取り扱いについては、各サービスのプライバシーポリシーをご確認ください。
      </p>
    ),
  },
  {
    title: "4. 第三者提供",
    children: (
      <p>
        取得した情報は、本人の同意がある場合、または法令に基づく場合を除き、第三者に提供しません。
      </p>
    ),
  },
  {
    title: "5. 安全管理",
    children: (
      <p>
        取得した情報について、不正アクセス、紛失、漏えいなどを防ぐため、適切な安全管理に努めます。
        ただし、インターネット上の通信の性質上、完全な安全を保証するものではありません。
      </p>
    ),
  },
  {
    title: "6. 開示・訂正・削除などの請求",
    children: (
      <p>
        ご本人から、当サイトが保有するお問い合わせ情報の開示、訂正、削除などをご希望の場合は、
        <Link to="/contact" className="text-sky-700 underline underline-offset-4 hover:text-sky-900">
          お問い合わせフォーム
        </Link>
        からご連絡ください。ご本人であることを確認のうえ、合理的な範囲で対応します。
      </p>
    ),
  },
  {
    title: "7. お問い合わせ先",
    children: (
      <p>
        本ポリシーに関するお問い合わせや、個人情報の取り扱いに関するご相談は、
        <a
          href="mailto:info@niyu07.com"
          className="text-sky-700 underline underline-offset-4 hover:text-sky-900"
        >
          info@niyu07.com
        </a>
        までご連絡ください。運営者の氏名などの個人情報は、必要な場合を除き公開していません。
      </p>
    ),
  },
  {
    title: "8. 本ポリシーの変更",
    children: (
      <p>
        本ポリシーは、法令の改正や当サイトの運営内容の変更に応じて、予告なく改定することがあります。
        改定後のポリシーは、このページに掲載した時点から適用されます。
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <main className="px-4 pb-20 pt-28 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/75">
            Privacy Policy
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            プライバシーポリシー
          </h1>
          <p className="mt-5 text-white/80">最終更新日：2026年9月20日</p>
        </header>

        <article className="rounded-3xl border border-white/60 bg-white/90 p-6 text-left text-gray-700 shadow-xl backdrop-blur md:p-12">
          <p className="mb-8 leading-8">
            当サイト運営者は、当サイトにおける個人情報の取り扱いについて、以下のとおり定めます。
          </p>

          <div className="space-y-8 leading-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
                  {section.title}
                </h2>
                <div className="space-y-3">{section.children}</div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
            <p>制定日：2026年9月20日</p>
          </div>
        </article>
      </div>
    </main>
  );
}
