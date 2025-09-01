export const STOCK_PHOTOS = [
  // Fruits
  { id: 'apple', title: 'Apple', category: 'Fruits', tags: ['apple', 'fruit', 'red', 'fresh'], src: require('../../assets/stock/fruits/apple.jpg') },
  { id: 'banana', title: 'Banana', category: 'Fruits', tags: ['banana', 'fruit', 'yellow', 'tropical'], src: require('../../assets/stock/fruits/banana.jpg') },
  { id: 'orange', title: 'Orange', category: 'Fruits', tags: ['orange', 'fruit', 'citrus', 'vitamin-c'], src: require('../../assets/stock/fruits/orange.jpg') },
  { id: 'strawberry', title: 'Strawberry', category: 'Fruits', tags: ['strawberry', 'fruit', 'red', 'berry'], src: require('../../assets/stock/fruits/strawberry.jpg') },
  { id: 'grapes', title: 'Grapes', category: 'Fruits', tags: ['grapes', 'fruit', 'purple', 'bunch'], src: require('../../assets/stock/fruits/grapes.jpg') },
  { id: 'pineapple', title: 'Pineapple', category: 'Fruits', tags: ['pineapple', 'fruit', 'tropical', 'sweet'], src: require('../../assets/stock/fruits/pineapple.jpg') },
  { id: 'mango', title: 'Mango', category: 'Fruits', tags: ['mango', 'fruit', 'tropical', 'orange'], src: require('../../assets/stock/fruits/mango.jpg') },
  { id: 'peach', title: 'Peach', category: 'Fruits', tags: ['peach', 'fruit', 'stone-fruit', 'sweet'], src: require('../../assets/stock/fruits/peach.jpg') },

  // Vegetables
  { id: 'broccoli', title: 'Broccoli', category: 'Vegetables', tags: ['broccoli', 'vegetable', 'green', 'cruciferous'], src: require('../../assets/stock/vegetables/broccoli.jpg') },
  { id: 'carrot', title: 'Carrot', category: 'Vegetables', tags: ['carrot', 'vegetable', 'orange', 'root'], src: require('../../assets/stock/vegetables/carrot.jpg') },
  { id: 'tomato', title: 'Tomato', category: 'Vegetables', tags: ['tomato', 'vegetable', 'red', 'nightshade'], src: require('../../assets/stock/vegetables/tomato.jpg') },
  { id: 'lettuce', title: 'Lettuce', category: 'Vegetables', tags: ['lettuce', 'vegetable', 'green', 'leafy'], src: require('../../assets/stock/vegetables/lettuce.jpg') },
  { id: 'onion', title: 'Onion', category: 'Vegetables', tags: ['onion', 'vegetable', 'white', 'allium'], src: require('../../assets/stock/vegetables/onion.jpg') },
  { id: 'bell-pepper', title: 'Bell Pepper', category: 'Vegetables', tags: ['bell-pepper', 'vegetable', 'red', 'capsicum'], src: require('../../assets/stock/vegetables/bell-pepper.jpg') },
  { id: 'cucumber', title: 'Cucumber', category: 'Vegetables', tags: ['cucumber', 'vegetable', 'green', 'refreshing'], src: require('../../assets/stock/vegetables/cucumber.jpg') },
  { id: 'spinach', title: 'Spinach', category: 'Vegetables', tags: ['spinach', 'vegetable', 'green', 'leafy'], src: require('../../assets/stock/vegetables/spinach.jpg') },

  // Meats
  { id: 'steak', title: 'Steak', category: 'Meats', tags: ['steak', 'beef', 'meat', 'grilled'], src: require('../../assets/stock/meats/steak.jpg') },
  { id: 'chicken-breast', title: 'Chicken Breast', category: 'Meats', tags: ['chicken', 'breast', 'meat', 'poultry'], src: require('../../assets/stock/meats/chicken-breast.jpg') },
  { id: 'pork-chop', title: 'Pork Chop', category: 'Meats', tags: ['pork', 'chop', 'meat', 'pig'], src: require('../../assets/stock/meats/pork-chop.jpg') },
  { id: 'lamb-chop', title: 'Lamb Chop', category: 'Meats', tags: ['lamb', 'chop', 'meat', 'sheep'], src: require('../../assets/stock/meats/lamb-chop.jpg') },
  { id: 'bacon', title: 'Bacon', category: 'Meats', tags: ['bacon', 'pork', 'meat', 'breakfast'], src: require('../../assets/stock/meats/bacon.jpg') },
  { id: 'sausage', title: 'Sausage', category: 'Meats', tags: ['sausage', 'meat', 'processed', 'grilled'], src: require('../../assets/stock/meats/sausage.jpg') },

  // Seafood
  { id: 'salmon', title: 'Salmon', category: 'Seafood', tags: ['salmon', 'fish', 'seafood', 'oily-fish'], src: require('../../assets/stock/seafood/salmon.jpg') },
  { id: 'tuna', title: 'Tuna', category: 'Seafood', tags: ['tuna', 'fish', 'seafood', 'ocean'], src: require('../../assets/stock/seafood/tuna.jpg') },
  { id: 'shrimp', title: 'Shrimp', category: 'Seafood', tags: ['shrimp', 'shellfish', 'seafood', 'prawn'], src: require('../../assets/stock/seafood/shrimp.jpg') },
  { id: 'cod', title: 'Cod', category: 'Seafood', tags: ['cod', 'fish', 'seafood', 'white-fish'], src: require('../../assets/stock/seafood/cod.jpg') },
  { id: 'mussels', title: 'Mussels', category: 'Seafood', tags: ['mussels', 'shellfish', 'seafood', 'mollusk'], src: require('../../assets/stock/seafood/mussels.jpg') },
  { id: 'lobster', title: 'Lobster', category: 'Seafood', tags: ['lobster', 'shellfish', 'seafood', 'crustacean'], src: require('../../assets/stock/seafood/lobster.jpg') },

  // Pastas
  { id: 'spaghetti', title: 'Spaghetti', category: 'Pastas', tags: ['spaghetti', 'pasta', 'noodles', 'long'], src: require('../../assets/stock/pastas/spaghetti.jpg') },
  { id: 'penne', title: 'Penne', category: 'Pastas', tags: ['penne', 'pasta', 'tube', 'ridged'], src: require('../../assets/stock/pastas/penne.jpg') },
  { id: 'fettuccine', title: 'Fettuccine', category: 'Pastas', tags: ['fettuccine', 'pasta', 'flat', 'ribbon'], src: require('../../assets/stock/pastas/fettuccine.jpg') },
  { id: 'ravioli', title: 'Ravioli', category: 'Pastas', tags: ['ravioli', 'pasta', 'filled', 'dumpling'], src: require('../../assets/stock/pastas/ravioli.jpg') },
  { id: 'lasagna', title: 'Lasagna', category: 'Pastas', tags: ['lasagna', 'pasta', 'layered', 'baked'], src: require('../../assets/stock/pastas/lasagna.jpg') },
  { id: 'macaroni', title: 'Macaroni', category: 'Pastas', tags: ['macaroni', 'pasta', 'elbow', 'curved'], src: require('../../assets/stock/pastas/macaroni.jpg') },

  // Sauces
  { id: 'tomato-sauce', title: 'Tomato Sauce', category: 'Sauces', tags: ['tomato', 'sauce', 'marinara', 'italian'], src: require('../../assets/stock/sauces/tomato.jpg') },
  { id: 'alfredo-sauce', title: 'Alfredo Sauce', category: 'Sauces', tags: ['alfredo', 'sauce', 'cream', 'cheese'], src: require('../../assets/stock/sauces/alfredo.jpg') },
  { id: 'pesto', title: 'Pesto', category: 'Sauces', tags: ['pesto', 'sauce', 'basil', 'green'], src: require('../../assets/stock/sauces/pesto.jpg') },
  { id: 'bolognese', title: 'Bolognese', category: 'Sauces', tags: ['bolognese', 'sauce', 'meat', 'tomato'], src: require('../../assets/stock/sauces/bolognese.jpg') },
  { id: 'carbonara', title: 'Carbonara', category: 'Sauces', tags: ['carbonara', 'sauce', 'egg', 'bacon'], src: require('../../assets/stock/sauces/carbonara.jpg') },
  { id: 'marinara', title: 'Marinara', category: 'Sauces', tags: ['marinara', 'sauce', 'tomato', 'simple'], src: require('../../assets/stock/sauces/marinara.jpg') },

  // Dairy
  { id: 'milk', title: 'Milk', category: 'Dairy', tags: ['milk', 'dairy', 'drink', 'calcium'], src: require('../../assets/stock/dairy/milk.jpg') },
  { id: 'cheese', title: 'Cheese', category: 'Dairy', tags: ['cheese', 'dairy', 'aged', 'protein'], src: require('../../assets/stock/dairy/cheese.jpg') },
  { id: 'yogurt', title: 'Yogurt', category: 'Dairy', tags: ['yogurt', 'dairy', 'probiotic', 'cultured'], src: require('../../assets/stock/dairy/yogurt.jpg') },
  { id: 'butter', title: 'Butter', category: 'Dairy', tags: ['butter', 'dairy', 'fat', 'spread'], src: require('../../assets/stock/dairy/butter.jpg') },
  { id: 'cream', title: 'Cream', category: 'Dairy', tags: ['cream', 'dairy', 'fat', 'whipping'], src: require('../../assets/stock/dairy/cream.jpg') },
  { id: 'cottage-cheese', title: 'Cottage Cheese', category: 'Dairy', tags: ['cottage-cheese', 'dairy', 'curd', 'protein'], src: require('../../assets/stock/dairy/cottage-cheese.jpg') },

  // Sweets
  { id: 'chocolate', title: 'Chocolate', category: 'Sweets', tags: ['chocolate', 'sweet', 'cocoa', 'dessert'], src: require('../../assets/stock/sweets/chocolate.jpg') },
  { id: 'cake', title: 'Cake', category: 'Sweets', tags: ['cake', 'sweet', 'dessert', 'baked'], src: require('../../assets/stock/sweets/cake.jpg') },
  { id: 'ice-cream', title: 'Ice Cream', category: 'Sweets', tags: ['ice-cream', 'sweet', 'frozen', 'dessert'], src: require('../../assets/stock/sweets/ice-cream.jpg') },
  { id: 'cookies', title: 'Cookies', category: 'Sweets', tags: ['cookies', 'sweet', 'baked', 'snack'], src: require('../../assets/stock/sweets/cookies.jpg') },
  { id: 'pie', title: 'Pie', category: 'Sweets', tags: ['pie', 'sweet', 'dessert', 'crust'], src: require('../../assets/stock/sweets/pie.jpg') },
  { id: 'candy', title: 'Candy', category: 'Sweets', tags: ['candy', 'sweet', 'sugar', 'treat'], src: require('../../assets/stock/sweets/candy.jpg') },

  // Beverages
  { id: 'coffee', title: 'Coffee', category: 'Beverages', tags: ['coffee', 'drink', 'caffeine', 'hot'], src: require('../../assets/stock/beverages/coffee.jpg') },
  { id: 'tea', title: 'Tea', category: 'Beverages', tags: ['tea', 'drink', 'herbal', 'hot'], src: require('../../assets/stock/beverages/tea.jpg') },
  { id: 'juice', title: 'Juice', category: 'Beverages', tags: ['juice', 'drink', 'fruit', 'fresh'], src: require('../../assets/stock/beverages/juice.jpg') },
  { id: 'soda', title: 'Soda', category: 'Beverages', tags: ['soda', 'drink', 'carbonated', 'sweet'], src: require('../../assets/stock/beverages/soda.jpg') },
  { id: 'water', title: 'Water', category: 'Beverages', tags: ['water', 'drink', 'hydrating', 'clear'], src: require('../../assets/stock/beverages/water.jpg') },
  { id: 'wine', title: 'Wine', category: 'Beverages', tags: ['wine', 'drink', 'alcoholic', 'grape'], src: require('../../assets/stock/beverages/wine.jpg') }
];

export const STOCK_LOOKUP = Object.fromEntries(STOCK_PHOTOS.map(p => [p.id, p]));

// Validation function to check if stock photos are properly loaded
export function validateStockPhotos() {
  console.log('Validating stock photos...');
  console.log('STOCK_PHOTOS length:', STOCK_PHOTOS.length);
  console.log('STOCK_LOOKUP keys:', Object.keys(STOCK_LOOKUP));
  
  // Check first few photos
  STOCK_PHOTOS.slice(0, 3).forEach(photo => {
    console.log(`Photo ${photo.id}:`, {
      id: photo.id,
      title: photo.title,
      category: photo.category,
      hasSrc: !!photo.src,
      srcType: typeof photo.src
    });
  });
}
