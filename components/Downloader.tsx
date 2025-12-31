'use client';

import { motion } from 'framer-motion';
import { Download, Instagram, Music, Video, Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function Downloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('mp4');

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, type: activeTab }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge variant="secondary" className="mb-4 px-4 py-1 rounded-full text-primary border-primary/20 bg-primary/5">
          Pro Downloader
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
          Save Moments Instantly
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Download high-quality videos and audios from TikTok and Instagram without limits.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <Card className="relative border-none shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <Tabs defaultValue="mp4" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-6 bg-muted/50 p-1">
                  <TabsTrigger value="mp4" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Video className="w-4 h-4 mr-2" />
                    Video (MP4)
                  </TabsTrigger>
                  <TabsTrigger value="mp3" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Music className="w-4 h-4 mr-2" />
                    Audio (MP3)
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    placeholder="Paste TikTok or Instagram link here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-14 pl-5 rounded-xl border-muted-foreground/20 focus-visible:ring-primary/30"
                  />
                  {url && (
                    <button 
                      onClick={() => setUrl('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <Button 
                  onClick={handleDownload} 
                  disabled={loading || !url}
                  className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 transform active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-xl border border-destructive/20"
                >
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <Card className="overflow-hidden border-none shadow-xl bg-card/80 backdrop-blur-md">
            <div className="md:flex">
              <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden bg-muted">
                <img 
                  src={result.thumbnail} 
                  alt="Thumbnail" 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-black/50 backdrop-blur text-white border-none">
                    {result.duration}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 md:flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 line-clamp-2">{result.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-6">
                    <span className="font-medium text-foreground">@{result.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 capitalize">
                      {result.platform === 'tiktok' ? 'TikTok' : 'Instagram'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button asChild className="rounded-xl h-12">
                    <a href={result.downloadUrl} download>
                      <Video className="w-4 h-4 mr-2" />
                      Download Video
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="rounded-xl h-12">
                    <a href={result.audioUrl} download>
                      <Music className="w-4 h-4 mr-2" />
                      Download Audio
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Features List */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Video, title: 'HD Quality', desc: 'Download in the highest possible resolution available.' },
          { icon: Music, title: 'Extract MP3', desc: 'Easily convert any video to high quality audio format.' },
          { icon: Instagram, title: 'IG & TikTok', desc: 'One tool for all your favorite social media platforms.' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-secondary/30 border border-secondary/50 hover:bg-secondary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <feature.icon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
            <p className="text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
