export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productName = searchParams.get('name');

  // Пример данных о продуктах
  const products = {
    'microphone-a': {
      name: 'Microphone A',
      description: 'A top-tier microphone that captures every detail of your sound.',
      price: 25,
      imageUrl: '/images/microphone-a.png',
      category: 'Microphones',
      brand: 'Brand A',
      features: ['High sensitivity', 'Wide frequency response', 'Durable design'],
      specifications: {
        weight: '0.5 kg',
        dimensions: '5 x 5 x 15 cm',
        brand: 'Brand A',
        model: 'A1',
      },
      reviews: [
        { user: 'John', rating: 5, comment: 'Excellent microphone!' },
        { user: 'Jane', rating: 4, comment: 'Great sound quality, but a bit expensive.' },
      ],
    },
    'mixer-b': {
      name: 'Mixer B',
      description: 'An advanced mixer that gives you full control over your audio projects.',
      price: 50,
      imageUrl: '/images/mixers-b.png',
      category: 'Mixers',
      brand: 'Brand B',
      features: ['Multiple input channels', 'Built-in effects', 'Easy to use'],
      specifications: {
        weight: '2 kg',
        dimensions: '30 x 20 x 5 cm',
        brand: 'Brand B',
        model: 'B200',
      },
      reviews: [
        { user: 'Alice', rating: 5, comment: 'This mixer is fantastic for live shows.' },
        { user: 'Bob', rating: 3, comment: 'Good, but could use more features.' },
      ],
    },
    'headphones-c': {
      name: 'Headphones C',
      description: 'High-fidelity headphones that let you hear every nuance.',
      price: 15,
      imageUrl: '/images/headphones-c.webp',
      category: 'Headphones',
      brand: 'Brand C',
      features: ['Noise cancellation', 'Comfortable fit', 'Long battery life'],
      specifications: {
        weight: '0.3 kg',
        dimensions: '15 x 10 x 7 cm',
        brand: 'Brand C',
        model: 'C300',
      },
      reviews: [
        { user: 'Charlie', rating: 4, comment: 'Very comfortable, sound quality is top-notch.' },
        { user: 'Dave', rating: 5, comment: 'Best headphones I\'ve ever used!' },
      ],
    },
  };

  if (productName) {

    const product = products[productName.toLowerCase()];
    if (product) {
      return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else {

    return new Response(JSON.stringify(Object.values(products)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
