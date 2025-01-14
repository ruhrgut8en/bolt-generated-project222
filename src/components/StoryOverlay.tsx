// Update the existing StoryOverlay.tsx
interface StoryOverlayProps {
  fragment: StoryFragment;
  onChoice: (choice: 'truth' | 'fantasy') => void;
  onClose: () => void;
}

export const StoryOverlay: React.FC<StoryOverlayProps> = ({
  fragment,
  onChoice,
  onClose
}) => {
  const [isAnimating, setIsAnimating] = useState(true);

  const getThemeStyles = () => {
    switch (fragment.theme) {
      case 'alien':
        return 'border-purple-500 bg-purple-900/90';
      case 'ancient':
        return 'border-yellow-500 bg-yellow-900/90';
      case 'virus':
        return 'border-red-500 bg-red-900/90';
      default:
        return 'border-green-500 bg-gray-900/90';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className={`
        max-w-lg w-full rounded-lg p-6 shadow-2xl
        transform transition-all duration-500
        ${getThemeStyles()}
        ${isAnimating ? 'animate-slideIn' : ''}
      `}>
        {/* Theme-specific icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          {fragment.theme === 'alien' && <Alien className="w-12 h-12 text-purple-400" />}
          {fragment.theme === 'ancient' && <Pyramid className="w-12 h-12 text-yellow-400" />}
          {fragment.theme === 'virus' && <Virus className="w-12 h-12 text-red-400" />}
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold mb-4">{fragment.title}</h2>
        <p className="text-gray-300 mb-6">{fragment.description}</p>

        {/* Choice buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onChoice('truth')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
          >
            Seek Truth
          </button>
          <button
            onClick={() => onChoice('fantasy')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors"
          >
            Embrace Mystery
          </button>
        </div>
      </div>
    </div>
  );
};
