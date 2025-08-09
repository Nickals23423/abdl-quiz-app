import { Quiz, QuizResult } from '../types/quiz';

export const personalityQuiz: Quiz = {
  id: 'personality-little-type',
  title: 'What Type of Little Are You?',
  description: 'Discover your unique little personality with this fun quiz!',
  emoji: '🎭',
  type: 'personality',
  questions: [
    {
      id: 'comfort-item',
      text: 'What comfort item makes you feel the safest?',
      type: 'multiple-choice',
      options: [
        { id: 'teddy', text: 'A soft teddy bear', value: 'teddy', emoji: '🧸' },
        { id: 'blankie', text: 'A cozy blanket', value: 'blankie', emoji: '🛌' },
        { id: 'pacifier', text: 'A pacifier', value: 'pacifier', emoji: '🍼' },
        { id: 'stuffie', text: 'Various stuffed animals', value: 'stuffie', emoji: '🦄' }
      ]
    },
    {
      id: 'favorite-activity',
      text: 'What sounds like the most fun way to spend an afternoon?',
      type: 'multiple-choice',
      options: [
        { id: 'coloring', text: 'Coloring books and crayons', value: 'creative', emoji: '🎨' },
        { id: 'cartoons', text: 'Watching cartoons', value: 'playful', emoji: '📺' },
        { id: 'napping', text: 'Taking a cozy nap', value: 'peaceful', emoji: '😴' },
        { id: 'playing', text: 'Playing with toys', value: 'energetic', emoji: '🎲' }
      ]
    },
    {
      id: 'bedtime-routine',
      text: 'What\'s your ideal bedtime routine?',
      type: 'multiple-choice',
      options: [
        { id: 'story', text: 'Being read a bedtime story', value: 'nurturing', emoji: '📚' },
        { id: 'warm-milk', text: 'Warm milk and cuddles', value: 'comfort', emoji: '🥛' },
        { id: 'lullaby', text: 'Soft lullabies', value: 'soothing', emoji: '🎵' },
        { id: 'nightlight', text: 'Pretty nightlight and stuffies', value: 'secure', emoji: '💡' }
      ]
    },
    {
      id: 'social-preference',
      text: 'How do you prefer to interact with others in little space?',
      type: 'multiple-choice',
      options: [
        { id: 'shy', text: 'I\'m shy and prefer quiet activities', value: 'introverted', emoji: '🙈' },
        { id: 'playful', text: 'I love playing games together', value: 'social', emoji: '🎪' },
        { id: 'helpful', text: 'I like helping with simple tasks', value: 'helpful', emoji: '🌟' },
        { id: 'independent', text: 'I enjoy my own little world', value: 'independent', emoji: '🦋' }
      ]
    }
  ],
  resultCalculator: (answers) => {
    const traits: Record<string, number> = {
      cuddly: 0,
      creative: 0,
      playful: 0,
      peaceful: 0,
      nurturing: 0,
      independent: 0
    };

    // Score based on answers
    if (answers['comfort-item'] === 'teddy') traits.cuddly += 2;
    if (answers['comfort-item'] === 'blankie') traits.peaceful += 2;
    if (answers['comfort-item'] === 'pacifier') traits.nurturing += 2;
    if (answers['comfort-item'] === 'stuffie') traits.playful += 2;

    if (answers['favorite-activity'] === 'creative') traits.creative += 2;
    if (answers['favorite-activity'] === 'playful') traits.playful += 2;
    if (answers['favorite-activity'] === 'peaceful') traits.peaceful += 2;
    if (answers['favorite-activity'] === 'energetic') traits.playful += 2;

    if (answers['bedtime-routine'] === 'nurturing') traits.nurturing += 2;
    if (answers['bedtime-routine'] === 'comfort') traits.cuddly += 2;
    if (answers['bedtime-routine'] === 'soothing') traits.peaceful += 2;
    if (answers['bedtime-routine'] === 'secure') traits.independent += 1;

    if (answers['social-preference'] === 'introverted') traits.peaceful += 2;
    if (answers['social-preference'] === 'social') traits.playful += 2;
    if (answers['social-preference'] === 'helpful') traits.nurturing += 2;
    if (answers['social-preference'] === 'independent') traits.independent += 2;

    // Find dominant trait
    const maxTrait = Object.keys(traits).reduce((a, b) => 
      traits[a as keyof typeof traits] > traits[b as keyof typeof traits] ? a : b
    );

    const results: Record<string, QuizResult> = {
      cuddly: {
        id: 'cuddly-bear',
        title: 'Cuddly Bear 🧸',
        description: 'You\'re the sweetest little bear who loves snuggles, soft things, and feeling safe and loved. Your gentle nature makes everyone want to give you the biggest hugs!',
        emoji: '🧸',
        badges: ['hugger', 'soft-heart'],
        shareableText: 'I\'m a Cuddly Bear! 🧸 Soft, sweet, and always ready for snuggles!'
      },
      creative: {
        id: 'artistic-butterfly',
        title: 'Artistic Butterfly 🎨',
        description: 'You\'re a creative little soul who loves making beautiful things! Whether it\'s coloring, crafting, or imagining wonderful stories, your creativity shines bright.',
        emoji: '🎨',
        badges: ['artist', 'creative-spirit'],
        shareableText: 'I\'m an Artistic Butterfly! 🎨 Creative, colorful, and full of imagination!'
      },
      playful: {
        id: 'bouncy-puppy',
        title: 'Bouncy Puppy 🐶',
        description: 'You\'re full of energy and love to play! Games, toys, and fun activities make you the happiest little pup. Your enthusiasm is absolutely infectious!',
        emoji: '🐶',
        badges: ['energetic', 'playful-spirit'],
        shareableText: 'I\'m a Bouncy Puppy! 🐶 Playful, energetic, and always ready for fun!'
      },
      peaceful: {
        id: 'sleepy-kitten',
        title: 'Sleepy Kitten 😴',
        description: 'You\'re the most peaceful little kitten who loves cozy naps, quiet moments, and gentle activities. Your calm presence brings serenity to everyone around you.',
        emoji: '😴',
        badges: ['peaceful', 'zen-master'],
        shareableText: 'I\'m a Sleepy Kitten! 😴 Peaceful, cozy, and perfectly content!'
      },
      nurturing: {
        id: 'caring-bunny',
        title: 'Caring Bunny 🐰',
        description: 'You have such a loving heart! You enjoy helping others and being taken care of. Your nurturing spirit makes you everyone\'s favorite little bunny.',
        emoji: '🐰',
        badges: ['helper', 'kind-heart'],
        shareableText: 'I\'m a Caring Bunny! 🐰 Loving, helpful, and full of kindness!'
      },
      independent: {
        id: 'brave-fox',
        title: 'Brave Little Fox 🦊',
        description: 'You\'re a clever and independent little fox who loves exploring your own little world. You\'re confident and curious, always ready for new adventures!',
        emoji: '🦊',
        badges: ['brave', 'explorer'],
        shareableText: 'I\'m a Brave Little Fox! 🦊 Independent, clever, and ready for adventure!'
      }
    };

    return results[maxTrait as keyof typeof results] || results.cuddly;
  }
};

export const knowledgeQuiz: Quiz = {
  id: 'little-space-trivia',
  title: 'Little Space Trivia',
  description: 'Test your knowledge about age regression and little space with fun trivia!',
  emoji: '🧠',
  type: 'knowledge',
  questions: [
    {
      id: 'age-regression-definition',
      text: 'Age regression is primarily about:',
      type: 'multiple-choice',
      options: [
        { id: 'therapy', text: 'A therapeutic coping mechanism', value: 'correct' },
        { id: 'roleplay', text: 'Only roleplay activities', value: 'incorrect' },
        { id: 'fashion', text: 'Just wearing certain clothes', value: 'incorrect' },
        { id: 'toys', text: 'Only playing with toys', value: 'incorrect' }
      ]
    },
    {
      id: 'little-space-safety',
      text: 'What\'s most important in little space?',
      type: 'multiple-choice',
      options: [
        { id: 'safety', text: 'Feeling safe and comfortable', value: 'correct' },
        { id: 'rules', text: 'Following strict rules', value: 'incorrect' },
        { id: 'others', text: 'Impressing other people', value: 'incorrect' },
        { id: 'perfection', text: 'Being the "perfect" little', value: 'incorrect' }
      ]
    },
    {
      id: 'community-values',
      text: 'The ABDL/little community values:',
      type: 'multiple-choice',
      options: [
        { id: 'acceptance', text: 'Acceptance and non-judgment', value: 'correct' },
        { id: 'competition', text: 'Competition between littles', value: 'incorrect' },
        { id: 'conformity', text: 'Everyone being exactly the same', value: 'incorrect' },
        { id: 'exclusivity', text: 'Being exclusive and secretive', value: 'incorrect' }
      ]
    }
  ],
  resultCalculator: (answers) => {
    const correctAnswers = Object.values(answers).filter(answer => answer === 'correct').length;
    const total = Object.keys(answers).length;
    const percentage = (correctAnswers / total) * 100;

    if (percentage >= 80) {
      return {
        id: 'little-expert',
        title: 'Little Space Expert! 🎓',
        description: 'Wow! You really know your stuff about little space and the community. You\'re like a wise little professor!',
        emoji: '🎓',
        badges: ['expert', 'wise-little'],
        shareableText: 'I\'m a Little Space Expert! 🎓 I aced the trivia with flying colors!'
      };
    } else if (percentage >= 60) {
      return {
        id: 'eager-learner',
        title: 'Eager Little Learner! 📚',
        description: 'You\'re doing great! You have good knowledge about little space and you\'re always ready to learn more.',
        emoji: '📚',
        badges: ['learner', 'curious-mind'],
        shareableText: 'I\'m an Eager Little Learner! 📚 Always ready to discover new things!'
      };
    } else {
      return {
        id: 'new-explorer',
        title: 'New Little Explorer! 🌟',
        description: 'Welcome to your journey! Everyone starts somewhere, and you\'re taking wonderful first steps in learning about little space.',
        emoji: '🌟',
        badges: ['newcomer', 'brave-start'],
        shareableText: 'I\'m a New Little Explorer! 🌟 Just starting my adventure in little space!'
      };
    }
  }
};

export const scenarioQuiz: Quiz = {
  id: 'little-adventures',
  title: 'Little Space Adventures',
  description: 'Choose your own adventure in these fun little space scenarios!',
  emoji: '🎪',
  type: 'scenario',
  questions: [
    {
      id: 'rainy-day',
      text: 'It\'s a rainy Saturday and you\'re in little space. What sounds most appealing?',
      type: 'multiple-choice',
      options: [
        { id: 'indoor-fort', text: 'Building a blanket fort', value: 'creative' },
        { id: 'movie-marathon', text: 'Having a cartoon movie marathon', value: 'relaxed' },
        { id: 'art-project', text: 'Starting a big art project', value: 'artistic' },
        { id: 'cozy-nap', text: 'Taking a cozy nap with stuffies', value: 'peaceful' }
      ],
      nextQuestion: (answer) => {
        if (answer === 'creative') return 'fort-supplies';
        if (answer === 'relaxed') return 'movie-choice';
        if (answer === 'artistic') return 'art-medium';
        return 'nap-setup';
      }
    },
    {
      id: 'fort-supplies',
      text: 'For your blanket fort, you definitely need:',
      type: 'multiple-choice',
      options: [
        { id: 'fairy-lights', text: 'Fairy lights for magic', value: 'magical' },
        { id: 'snacks', text: 'Lots of little snacks', value: 'practical' },
        { id: 'stuffies', text: 'All your stuffed friends', value: 'social' },
        { id: 'books', text: 'A pile of storybooks', value: 'bookworm' }
      ]
    },
    {
      id: 'movie-choice',
      text: 'Which type of cartoon makes you happiest?',
      type: 'multiple-choice',
      options: [
        { id: 'classic', text: 'Classic Disney movies', value: 'nostalgic' },
        { id: 'adventure', text: 'Fun adventure shows', value: 'adventurous' },
        { id: 'slice-of-life', text: 'Cute slice-of-life anime', value: 'gentle' },
        { id: 'educational', text: 'Educational but fun shows', value: 'curious' }
      ]
    },
    {
      id: 'art-medium',
      text: 'What art supplies call to you today?',
      type: 'multiple-choice',
      options: [
        { id: 'crayons', text: 'Colorful crayons', value: 'classic' },
        { id: 'watercolors', text: 'Dreamy watercolors', value: 'ethereal' },
        { id: 'stickers', text: 'Stickers and collage materials', value: 'playful' },
        { id: 'clay', text: 'Soft modeling clay', value: 'tactile' }
      ]
    },
    {
      id: 'nap-setup',
      text: 'For the perfect nap, you arrange:',
      type: 'multiple-choice',
      options: [
        { id: 'sunbeam', text: 'Your bed in a warm sunbeam', value: 'natural' },
        { id: 'nest', text: 'A cozy nest of pillows', value: 'comfort' },
        { id: 'music', text: 'Soft music or nature sounds', value: 'sensory' },
        { id: 'stuffie-circle', text: 'A protective circle of stuffies', value: 'secure' }
      ]
    }
  ],
  resultCalculator: (answers) => {
    const values = Object.values(answers);
    
    // Count different types of responses
    const traits = {
      creative: ['creative', 'magical', 'playful'].filter(t => values.includes(t)).length,
      peaceful: ['peaceful', 'gentle', 'natural', 'comfort'].filter(t => values.includes(t)).length,
      adventurous: ['adventurous', 'curious', 'bookworm'].filter(t => values.includes(t)).length,
      artistic: ['artistic', 'ethereal', 'classic', 'tactile'].filter(t => values.includes(t)).length,
      social: ['social', 'practical'].filter(t => values.includes(t)).length
    };

    const dominantTrait = Object.keys(traits).reduce((a, b) => 
      traits[a as keyof typeof traits] > traits[b as keyof typeof traits] ? a : b
    );

    const results = {
      creative: {
        id: 'imaginative-dreamer',
        title: 'Imaginative Dreamer ✨',
        description: 'You have the most wonderful imagination! You love creating magical worlds and turning ordinary moments into extraordinary adventures.',
        emoji: '✨',
        badges: ['dreamer', 'magic-maker'],
        shareableText: 'I\'m an Imaginative Dreamer! ✨ I create magic in everyday moments!'
      },
      peaceful: {
        id: 'zen-little',
        title: 'Zen Little 🕯️',
        description: 'You know exactly how to find peace and comfort. Your ability to create calm, cozy spaces is truly a gift!',
        emoji: '🕯️',
        badges: ['zen-master', 'comfort-creator'],
        shareableText: 'I\'m a Zen Little! 🕯️ I find peace and create comfort wherever I go!'
      },
      adventurous: {
        id: 'curious-explorer',
        title: 'Curious Explorer 🗺️',
        description: 'You\'re always ready for the next adventure! Whether it\'s through books, shows, or real life, you love discovering new things.',
        emoji: '🗺️',
        badges: ['explorer', 'adventure-seeker'],
        shareableText: 'I\'m a Curious Explorer! 🗺️ Always ready for the next adventure!'
      },
      artistic: {
        id: 'creative-soul',
        title: 'Creative Soul 🎨',
        description: 'Art flows through everything you do! You see beauty everywhere and love expressing yourself through creative mediums.',
        emoji: '🎨',
        badges: ['artist', 'beauty-finder'],
        shareableText: 'I\'m a Creative Soul! 🎨 I express myself through art and beauty!'
      },
      social: {
        id: 'thoughtful-friend',
        title: 'Thoughtful Friend 💝',
        description: 'You always think of others and love making experiences special for everyone. Your caring nature makes you a wonderful friend!',
        emoji: '💝',
        badges: ['thoughtful', 'caring-friend'],
        shareableText: 'I\'m a Thoughtful Friend! 💝 I love making others feel special and cared for!'
      }
    };

    return results[dominantTrait as keyof typeof results] || results.creative;
  }
};

export const allQuizzes = [personalityQuiz, knowledgeQuiz, scenarioQuiz];