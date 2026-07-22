import React from 'react';
import { Mail, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const ContactCard = ({ icon: Icon, title, value, link, color }: any) => (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-[#0B1120] border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/5 transition-all group shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">{title}</h3>
          <p className="text-sm font-bold text-white mt-1 group-hover:text-accent transition-colors">{value}</p>
        </div>
      </div>
      <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors" />
    </Link>
  );

  return (
    <div className="w-full min-h-screen p-6 lg:p-10 pb-24 lg:pl-[17rem] animate-in fade-in duration-700 flex flex-col justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-black font-space text-white mb-4 uppercase tracking-wider">Secure Comms.</h1>
        <p className="text-sm font-mono text-white/50 mb-10 leading-relaxed max-w-2xl">
          Open for strategic FP&A roles, data analytics projects, and UAE/ADNOC targeted opportunities. Establish connection below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContactCard 
            icon={Linkedin} title="LinkedIn" value="Parvej Alam Ansari" 
            link="https://www.linkedin.com/in/parvej-alam-sulemanali-ansari-14808928b/" color="text-[#0A66C2]" 
          />
          <ContactCard 
            icon={Github} title="GitHub / Portfolio App" value="pa8213243-sudo" 
            link="https://github.com/pa8213243-sudo/ParvejPortfolio" color="text-white" 
          />
          <ContactCard 
            icon={Mail} title="Email Address" value="pa8213243@gmail.com" 
            link="mailto:pa8213243@gmail.com" color="text-danger" 
          />
          <ContactCard 
            icon={Globe} title="Old Website" value="Parwej Legacy Site" 
            link="https://courageous-queijadas-97ef87.netlify.app/" color="text-accent" 
          />
        </div>
      </div>
    </div>
  );
}