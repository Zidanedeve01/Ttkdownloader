import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { downloadLogs } from '@/server/db/schema';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const { url, type } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Detect platform
    let platform = 'unknown';
    if (url.includes('tiktok.com')) platform = 'tiktok';
    else if (url.includes('instagram.com')) platform = 'instagram';

    if (platform === 'unknown') {
      return NextResponse.json({ error: 'Unsupported platform. Only TikTok and Instagram are supported.' }, { status: 400 });
    }

    // Log the request
    await db.insert(downloadLogs).values({
      id: nanoid(),
      url,
      platform,
      type: type || 'mp4',
    });

    if (platform === 'tiktok') {
      try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.code === 0 && result.data) {
          return NextResponse.json({
            platform: 'tiktok',
            title: result.data.title || 'TikTok Video',
            thumbnail: result.data.cover,
            duration: `${result.data.duration}s`,
            author: result.data.author.nickname,
            downloadUrl: result.data.play, // Without watermark
            audioUrl: result.data.music,
          });
        }
      } catch (err) {
        console.error('TikTok API Error:', err);
      }
    }

    // Fallback or Instagram mock (Instagram usually requires Scraper API like RapidAPI)
    const mockData = {
      platform,
      title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Media Content`,
      thumbnail: platform === 'instagram' 
        ? 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&q=80'
        : 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
      duration: '00:15',
      author: 'SocialUser',
      downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      audioUrl: 'https://www.w3schools.com/html/horse.mp3',
      isMock: true
    };

    await new Promise(resolve => setTimeout(resolve, 800));
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to process URL' }, { status: 500 });
  }
}
