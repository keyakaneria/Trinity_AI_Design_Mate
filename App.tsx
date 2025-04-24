import React, { useState } from 'react';
import { Upload, X, RefreshCw } from 'lucide-react';

const FURNITURE_STYLES = {
  modern: {
    name: 'Modern',
    description: 'Clean lines, minimalist aesthetic, and contemporary appeal',
    inspirationImages: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800'
    ]
  },
  vintage: {
    name: 'Vintage',
    description: 'Classic charm with timeless elegance and nostalgic elements',
    inspirationImages: [
      'https://images.unsplash.com/photo-1551516594-56cb78394645?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528822855841-e8bf3134595c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  scandinavian: {
    name: 'Scandinavian',
    description: 'Simple, functional design with natural materials and light colors',
    inspirationImages: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  industrial: {
    name: 'Industrial',
    description: 'Raw materials, exposed elements, and urban sophistication',
    inspirationImages: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&q=80&w=800'
    ]
  },
  bohemian: {
    name: 'Bohemian',
    description: 'Eclectic mix of patterns, textures, and global influences',
    inspirationImages: [
      'https://images.unsplash.com/photo-1536008758366-72fbc5b16911?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
    ]
  }
};

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzedStyle, setAnalyzedStyle] = useState<keyof typeof FURNITURE_STYLES | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalyzedStyle(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const discardImage = () => {
    setSelectedImage(null);
    setAnalyzedStyle(null);
  };

  const analyzeStyle = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const styles = Object.keys(FURNITURE_STYLES) as (keyof typeof FURNITURE_STYLES)[];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      setAnalyzedStyle(randomStyle);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getMoreInspiration = () => {
    analyzeStyle();
  };

  return (
    <div className="min-h-screen bg-[#E1E5DB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl font-light text-[#4A5043] mb-4 tracking-widest">DESIGN MATE</h1>
          <p className="text-lg text-[#4A5043]/80 font-light tracking-wide">Discover Your Furniture's Style Story</p>
        </div>

        <div className="flex flex-col items-center mb-16">
          {selectedImage ? (
            <div className="w-full max-w-lg mb-8 relative">
              <img
                src={selectedImage}
                alt="Uploaded furniture"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={discardImage}
                className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-[#4A5043]" />
              </button>
            </div>
          ) : (
            <label className="w-[250px] h-[100px] flex flex-col items-center justify-center border border-[#4A5043]/20 cursor-pointer hover:border-[#4A5043]/40 transition-colors bg-[#F5F5DC]">
              <Upload className="w-5 h-5 text-[#4A5043] mb-2" />
              <span className="text-[#4A5043] font-light text-sm tracking-wide">Upload Your Image</span>
              <span className="text-xs text-[#4A5043]/60 mt-1 font-light">PNG, JPG up to 10MB</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
          
          <button
            onClick={analyzeStyle}
            disabled={!selectedImage || isAnalyzing}
            className={`mt-8 px-10 py-3 text-sm tracking-widest transition-all ${
              !selectedImage || isAnalyzing
                ? 'bg-[#4A5043]/20 text-[#4A5043]/40 cursor-not-allowed'
                : 'bg-[#4A5043] text-white hover:bg-[#3A3F35]'
            }`}
          >
            {isAnalyzing ? 'ANALYZING...' : 'ANALYZE STYLE'}
          </button>
        </div>

        {analyzedStyle && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-[#4A5043] mb-4 tracking-wider text-center">
              {FURNITURE_STYLES[analyzedStyle].name}
            </h2>
            <p className="text-[#4A5043]/80 mb-12 text-center font-light tracking-wide">
              {FURNITURE_STYLES[analyzedStyle].description}
            </p>
            
            <div className="flex justify-center mb-8">
              <button
                onClick={getMoreInspiration}
                className="flex items-center gap-2 px-6 py-2 text-sm text-[#4A5043] border border-[#4A5043]/20 hover:border-[#4A5043]/40 transition-colors rounded-full"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="tracking-wide">More Inspiration</span>
              </button>
            </div>

            <h3 className="text-sm font-medium text-[#4A5043] mb-8 tracking-widest text-center">STYLE INSPIRATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FURNITURE_STYLES[analyzedStyle].inspirationImages.map((image, index) => (
                <div key={index} className="group relative overflow-hidden">
                  <img
                    src={image}
                    alt={`${FURNITURE_STYLES[analyzedStyle].name} inspiration ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center text-[#4A5043]/60 text-xs tracking-wider font-light mt-12 mb-8">
          Developed by Trinity AI
        </footer>
      </div>
    </div>
  );
}

export default App;