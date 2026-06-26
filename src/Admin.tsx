import React, { useState } from 'react';

const AdminPage = () => {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [name, setName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const generateLink = () => {
    if (!name.trim()) {
      alert('Please enter a guest name');
      return;
    }

    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      prefix: prefix,
      name: name.trim()
    });
    
    const link = `${baseUrl}/?${params.toString()}`;
    setGeneratedLink(link);

    const message = `Dear ${prefix} ${name.trim()} ❤️

With joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Ashwan & Shehara`;

    setGeneratedMessage(message);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 border border-zinc-100">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 mb-8 text-center border-b pb-4">LINK GENERATOR</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Select Prefix</label>
            <select 
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full border border-zinc-300 rounded-md shadow-sm py-3 px-4 focus:ring-sage focus:border-sage bg-white text-zinc-700"
            >
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Family">Family</option>
              <option value="Dr. & Mrs.">Dr. & Mrs.</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Guest Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full border border-zinc-300 rounded-md shadow-sm py-3 px-4 focus:ring-sage focus:border-sage text-zinc-700"
            />
          </div>

          <button 
            onClick={generateLink}
            className="w-full bg-[#ad8b56] hover:bg-[#967646] text-white font-bold py-3 px-4 rounded-md shadow-md transition-colors duration-200 uppercase tracking-widest text-sm"
          >
            Generate Link
          </button>

          {generatedMessage && (
            <div className="mt-10 pt-8 border-t border-zinc-200">
              <h2 className="text-xl font-bold text-zinc-800 mb-4 text-center">Generated Invitation</h2>
              
              <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200 mb-6 whitespace-pre-wrap text-sm text-zinc-700 leading-relaxed font-serif italic">
                {generatedMessage}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleCopyLink}
                  className="flex-1 bg-white border-2 border-[#ad8b56] text-[#ad8b56] hover:bg-zinc-50 font-bold py-2.5 px-4 rounded-md transition-colors duration-200 text-sm"
                >
                  {copiedLink ? 'Copied!' : 'Copy Link Only'}
                </button>
                <button 
                  onClick={handleCopyMessage}
                  className="flex-1 bg-[#ad8b56] hover:bg-[#967646] text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-200 text-sm shadow-sm"
                >
                  {copiedMessage ? 'Copied!' : 'Copy Full Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
