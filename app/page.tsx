import Navbar from '@/components/Navbar';
import Downloader from '@/components/Downloader';
import EmailSection from '@/components/EmailSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-purple-500/10 rounded-full blur-[110px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-500/5 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="pt-20">
        <Downloader />
      </div>

      <EmailSection />
      
      <section className="py-24 container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            {[
              { q: 'Is it free to use?', a: 'Yes, SaverPro is completely free for everyone. We do not charge any fees for downloading videos or audio.' },
              { q: 'How many videos can I download?', a: 'There are no limits! You can download as many videos and audio files as you want.' },
              { q: 'Is my data safe?', a: 'We do not store your personal information or the videos you download. We only log anonymous platform stats to improve our service.' },
              { q: 'Do you support HD downloads?', a: 'Yes, we always try to provide the highest quality available from the source platform.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card/50">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">{i + 1}</span>
                  {faq.q}
                </h4>
                <p className="text-muted-foreground ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
