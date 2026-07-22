// @ts-nocheck
import React from 'react';
import Image from 'next/image';
import { getCertificates } from '@/services/dataService';
import { Award, CheckCircle, ShieldAlert, ExternalLink } from 'lucide-react';

export default function CertificatesVault() {
  const certificates = getCertificates();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-space mb-4 flex items-center gap-4">
          <Award className="w-10 h-10 text-warning" /> Achievement Vault
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Verified professional certifications showcasing continuous upskilling in corporate finance, 
          data analytics, and business strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          const certificateHref = cert.credentialUrl || cert.verificationUrl || '#';
          const badgeSrc = cert.image || cert.badgeImage || cert.certificateImage || '/images/certificates/fallback-badge.svg';

          return (
            <a
              key={cert.id}
              href={certificateHref}
              target="_blank"
              rel="noreferrer"
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-warning/50 hover:bg-[#111827] transition-all duration-300 flex flex-col md:flex-row gap-6"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold font-space group-hover:text-warning transition-colors">{cert.title}</h3>
                </div>
                <p className="text-white/60 font-medium mb-4">{cert.issuer}</p>
                
                <div className="flex items-center gap-4 text-sm font-mono text-white/40 mb-4">
                  <span>Date: {cert.date}</span>
                  <span>•</span>
                  <span>Category: {cert.category}</span>
                </div>

                {cert.credentialId && (
                  <div className="mb-4 text-sm text-white/70">
                    <span className="font-semibold text-warning">Credential ID:</span> {cert.credentialId}
                  </div>
                )}

                
      </div>
    </div>
  );
}