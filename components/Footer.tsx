'use client';

import { Github, Send, Instagram, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/30 backdrop-blur-sm">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">SaverPro</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              The fastest and most reliable way to download TikTok and Instagram media without watermarks. Free to use, forever.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://t.me/AlwaysDionz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary transition-colors"
                title="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/azzmzdn.mp4" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/Zidanedeve01" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary transition-colors"
                title="Github"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">TikTok Downloader</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram Downloader</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MP3 Converter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MP4 Downloader</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SaverPro. All rights reserved.
          </p>
          
          {/* Watermark Develover */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary/80 shadow-sm"
          >
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Crafted by</span>
            <a 
              href="https://github.com/Zidanedeve01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline group"
            >
              Zdanealltf Develover
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
