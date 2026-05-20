import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import Logo from "../assets/images/assest/logo.png";
import FacebookIcon from "../assets/images/assest/facebook.png";
import InstagramIcon from "../assets/images/assest/instagram.png";
import TwitterIcon from "../assets/images/assest/twitter.png";
import YoutubeIcon from "../assets/images/assest/youtube.png";

import LambiIcon from "../assets/images/assest/Lambi.png";
import DoosIcon from "../assets/images/assest/Doos.png";
import WanoosIcon from "../assets/images/assest/1noos.png";
import FazzIcon from "../assets/images/assest/Fazz.png";
import GarageIcon from "../assets/images/assest/Garage.png";
import RPayIcon from "../assets/images/assest/R.Pay.png";
import AssassinIcon from "../assets/images/assest/Assassin's Creed.png";
import EmojiIcon from "../assets/images/assest/emoji.png";
import ElCanteenIcon from "../assets/images/assest/El Canteen.png";
import FooterBgImage from "../assets/images/assest/footers bg.png";

// Simple SVG for WhatsApp icon
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <div className="w-full flex flex-col bg-[#0c0c0c] mt-auto">
      <div className="w-full flex justify-center flex-1 items-end pointer-events-none mt-12 md:mt-24">
        <img src={FooterBgImage} alt="Malahi Footer" className="w-[90%] md:w-[80%] max-w-[1440px] h-auto object-contain object-bottom drop-shadow-2xl relative z-10" />
      </div>
      <footer className="bg-[#111111] pt-12 pb-12 px-6 relative z-50 w-full shrink-0">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-[#ebebeb]">
        
        {/* Column 1: Logo & Info */}
        <div className="flex flex-col items-center lg:items-start order-1 lg:order-1 text-center lg:text-left">
          <img src={Logo} alt="Malahi" className="h-[70px] lg:h-[60px] w-auto mb-8" />
          
          <div className="flex gap-3 mb-8">
             <a href="#" className="w-10 h-10 rounded-full bg-[#1b1b1b] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"><img src={FacebookIcon} alt="Facebook" className="w-5 h-5 object-contain" /></a>
             <a href="#" className="w-10 h-10 rounded-full bg-[#1b1b1b] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"><img src={InstagramIcon} alt="Instagram" className="w-5 h-5 object-contain" /></a>
             <a href="#" className="w-10 h-10 rounded-full bg-[#1b1b1b] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"><img src={TwitterIcon} alt="X" className="w-5 h-5 object-contain" /></a>
             <a href="#" className="w-10 h-10 rounded-full bg-[#1b1b1b] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"><img src={YoutubeIcon} alt="YouTube" className="w-5 h-5 object-contain" /></a>
          </div>

          <div className="text-sm font-medium text-[#ebebeb] space-y-4">
            <p>© Malahi Company 2026</p>
            <p>Design and Development</p>
          </div>
        </div>

        {/* Column 4: Newsletter (Order 2 on Mobile, Order 4 on Desktop) */}
        <div className="flex flex-col order-2 md:order-4 lg:order-4 lg:pl-4">
           <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
           <p className="text-[#ebebeb] text-sm leading-relaxed mb-6 max-w-sm">
              Subscribe to the newsletter to receive our latest news
           </p>
           <div className="relative max-w-sm w-full">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white text-black rounded-full h-[48px] pl-5 pr-12 text-sm outline-none placeholder:text-gray-500 font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[#00b27b] hover:text-[#008f62] transition-colors">
                <ArrowRight size={22} className="stroke-[2.5px]" />
              </button>
           </div>
        </div>

        {/* Column 2: Design and Development (Brands) (Order 3 on Mobile, Order 2 on Desktop) */}
        <div className="flex flex-col order-3 md:order-2 lg:order-2">
           <h3 className="text-white font-bold text-lg mb-6">Design and Development</h3>
           <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"><img src={LambiIcon} alt="Lambi" className="w-full h-full object-cover" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">Lambi</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#032458] flex items-center justify-center overflow-hidden shrink-0"><img src={RPayIcon} alt="R.Pay" className="w-[70%] h-[70%] object-contain" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">R.Pay</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#032458] flex items-center justify-center overflow-hidden shrink-0"><img src={DoosIcon} alt="Doos" className="w-full h-full object-cover" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">Doos</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shrink-0"><img src={AssassinIcon} alt="Assassin's Creed" className="w-full h-full object-contain" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium whitespace-nowrap">Assassin's Creed</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"><img src={WanoosIcon} alt="Wanoos" className="w-full h-full object-cover" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">Wanoos</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#1B1B1B] p-1 flex items-center justify-center overflow-hidden shrink-0"><img src={EmojiIcon} alt="emoji" className="w-[80%] h-[80%] object-contain" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">emoji</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#0d0d0d] flex items-center justify-center overflow-hidden shrink-0"><img src={FazzIcon} alt="Fazz" className="w-full h-full object-cover" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">Fazz</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#8b3d88] flex items-center justify-center overflow-hidden shrink-0"><img src={ElCanteenIcon} alt="El Canteen" className="w-full h-full object-cover" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">El Canteen</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"><img src={GarageIcon} alt="Garage" className="w-[80%] h-[80%] object-contain" /></div>
                 <span className="text-[#ebebeb] text-sm font-medium">Garage</span>
              </div>
           </div>
        </div>

        {/* Column 3: Contact Information (Order 4 on Mobile, Order 3 on Desktop) */}
        <div className="flex flex-col lg:pl-10 order-4 md:order-3 lg:order-3">
           <h3 className="text-white font-bold text-lg mb-6">Contact Information</h3>
           <div className="space-y-5">
              <div className="flex items-center gap-3 text-[#ebebeb] text-sm font-medium">
                 <WhatsAppIcon size={18} />
                 <span>+966536517321</span>
              </div>
              <div className="flex items-center gap-3 text-[#ebebeb] text-sm font-medium">
                 <Phone size={18} />
                 <span>+966536517321</span>
              </div>
              <div className="flex items-center gap-3 text-[#ebebeb] text-sm font-medium">
                 <Mail size={18} />
                 <span>info@malahi.com</span>
              </div>
           </div>
        </div>

      </div>
    </footer>
    </div>
  );
}
