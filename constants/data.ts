import { FaClockRotateLeft } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaTags, FaStar } from "react-icons/fa";

import { DealCardType, MenuItemType, ProductType } from "@/modules/homePage/homePage.types";


export const JWT_SECRET = "eregr5trertw56rrgfhtyrt5tfasrgt235346346ffgsdfgdfsg4dfefsdrwef"

export const TABS_DATA = [
  { id: 1, name: "Recently Viewed", keyWord: "recently_viewed", icon: FaClockRotateLeft },
  { id: 2, name: "Weekly Deals", keyWord: "weekly_deals", icon: AiFillThunderbolt },
  { id: 3, name: "Hot Deals", keyWord: "hot_deals", icon: BsFire },
  { id: 4, name: "Top Brands", keyWord: "top_brands", icon: FaStar },
  { id: 5, name: "Choice", keyWord: "choice", icon: FaTags },
];

export const SLIDE_IMAGES = [
  {
    id: 1,
    url: "/SI1.webp",
    alt: "Slide 1",
  },
  {
    id: 2,
    url: "/SI2.webp",
    alt: "Slide 2",
  },
  {
    id: 3,
    url: "/SI3.webp",
    alt: "Slide 3",
  },
  {
    id: 4,
    url: "/SI4.webp",
    alt: "Slide 4",
  },
];

export const MENUITEMS: MenuItemType[] = [
  {
    id: 1,
    name: "TV & Home Theatre",
    icon: "tv",
    image: "/categories/tv-home-theatre.jpg",
    subMenu: {
      title: "Top Brands",
      sections: [
        {
          heading: "TVs & Projectors",
          image: "https://i.pinimg.com/736x/0c/af/1a/0caf1a1dc300c40a54b56f9ae7eb8635.jpg",
          items: [{ name: "Smart TVs", image: "https://i.pinimg.com/736x/57/80/ac/5780ac2b64c9f4177054455119124a8e.jpg" }, { name: "Projectors", image: "https://i.pinimg.com/736x/34/fc/d4/34fcd497b0278ce3c32feaf1f1e4d2c9.jpg" }, { name: "Laser Projectors", image: "https://i.pinimg.com/736x/f7/1c/28/f71c28c65b99a6cbfb23749611de5211.jpg" }],
        },
        {
          heading: "TV Types",
          image: "https://i.pinimg.com/736x/1a/bf/70/1abf70005d5d213c6a19cb69dbe99767.jpg",
          items: [{ name: "LED TVs", image: "/items/led-tv.jpg" }, { name: "QLED TVs", image: "/items/qled-tv.jpg" }, { name: "OLED TVs", image: "/items/oled-tv.jpg" }, { name: "Mini-LED TVs", image: "/items/mini-led-tv.jpg" }],
        },
        {
          heading: "TV Sizes",
          image: "https://i.pinimg.com/736x/57/80/ac/5780ac2b64c9f4177054455119124a8e.jpg",
          items: [{ name: "32 Inch", image: "/items/32-inch.jpg" }, { name: "43 Inch", image: "/items/43-inch.jpg" }, { name: "55 Inch", image: "/items/55-inch.jpg" }, { name: "65 Inch & Above", image: "/items/65-inch-above.jpg" }],
        },
        {
          heading: "Audio",
          image: "https://i.pinimg.com/736x/90/3f/66/903f66db561c426d8f8e9c551ece7cee.jpg",
          items: [{ name: "Soundbars", image: "/items/soundbar.jpg" }, { name: "Home Theatre Systems", image: "/items/home-theatre-system.jpg" }, { name: "Subwoofers", image: "/items/subwoofer.jpg" }],
        },
      ],
    },
  },

  {
    id: 2,
    name: "Phones & Wearables",
    icon: "phone",
    image: "https://i.pinimg.com/736x/2b/11/37/2b1137acf95f002f46b9ced0b3656a8a.jpg",
    subMenu: {
      title: "Top Brands",
      sections: [
        {
          heading: "Smartphones",
          image: "https://i.pinimg.com/736x/93/21/73/932173052cfc24fba601a10ca062401c.jpg",
          items: [
            { name: "Android Phones", image: "https://i.pinimg.com/736x/00/9b/91/009b91eaa9c50df8e5d5681cbde9a9c3.jpg" },
            { name: "iPhones", image: "https://i.pinimg.com/736x/f1/c0/60/f1c060a9afd4e1a2c11d59537d779f7e.jpg" },
            { name: "Gaming Phones", image: "https://i.pinimg.com/736x/dd/46/cd/dd46cd6b14f82e05cced6710d0664a45.jpg" }
          ],
        },
        {
          heading: "Accessories",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Chargers", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "Cases", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "Power Banks", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "Earbuds", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" }
          ],
        },
        {
          heading: "Wearables",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Smart Watches", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "Fitness Bands", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "Smart Rings", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" }
          ],
        },
        {
          heading: "Apple",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "iPhone 13", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "iPhone 14", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "iPhone 15", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" },
            { name: "Apple Watch", image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg" }
          ],
        },
      ],
    },
  },

  {
    id: 3,
    name: "Computers, Laptops & Tablets",
    icon: "laptop",
    image: "/categories/computers-laptops.jpg",
    subMenu: {
      title: "Top Brands",
      sections: [
        {
          heading: "Laptops",
          image: "https://i.pinimg.com/736x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg",
          items: [{ name: "Gaming Laptops", image: "/items/gaming-laptop.jpg" }, { name: "Business Laptops", image: "/items/business-laptop.jpg" }, { name: "MacBooks", image: "/items/macbook.jpg" }],
        },
        {
          heading: "Desktops",
          image: "https://i.pinimg.com/736x/e2/34/00/e23400aaaca37880f3ba3d86806578a5.jpg",
          items: [{ name: "All-in-One PCs", image: "/items/all-in-one-pc.jpg" }, { name: "Gaming PCs", image: "/items/gaming-pc.jpg" }, { name: "Mini PCs", image: "/items/mini-pc.jpg" }],
        },
        {
          heading: "Tablets",
          image: "https://i.pinimg.com/736x/4e/6c/1c/4e6c1c80d6e32f7232ff55039d2c1f1b.jpg",
          items: [{ name: "iPads", image: "/items/ipad.jpg" }, { name: "Android Tablets", image: "/items/android-tablet.jpg" }, { name: "Drawing Tablets", image: "/items/drawing-tablet.jpg" }],
        },
        {
          heading: "Accessories",
          image: "https://i.pinimg.com/736x/6d/dd/64/6ddd64c3de47d48cc81a06236c50e2d6.jpg",
          items: [{ name: "Keyboards", image: "/items/keyboard.jpg" }, { name: "Mouse", image: "/items/mouse.jpg" }, { name: "Laptop Bags", image: "/items/laptop-bag.jpg" }, { name: "Monitors", image: "/items/monitor.jpg" }],
        },
      ],
    },
  },

  {
    id: 4,
    name: "Gaming",
    icon: "game",
    image: "/categories/gaming.jpg",
    subMenu: {
      title: "Top Brands",
      sections: [
        {
          heading: "Consoles",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "PlayStation", image: "/items/playstation.jpg" },
            { name: "Xbox", image: "/items/xbox.jpg" },
            { name: "Nintendo Switch", image: "/items/nintendo-switch.jpg" }
          ],
        },
        {
          heading: "PC Gaming",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Gaming PCs", image: "/items/gaming-pc.jpg" },
            { name: "Gaming Keyboards", image: "/items/gaming-keyboard.jpg" },
            { name: "Gaming Mouse", image: "/items/gaming-mouse.jpg" }
          ],
        },
        {
          heading: "Accessories",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Controllers", image: "/items/controllers.jpg" },
            { name: "Gaming Chairs", image: "/items/gaming-chairs.jpg" },
            { name: "Headsets", image: "/items/headsets.jpg" }
          ],
        },
        {
          heading: "Games",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Action Games", image: "/items/action-games.jpg" },
            { name: "Racing Games", image: "/items/racing-games.jpg" },
            { name: "Sports Games", image: "/items/sports-games.jpg" }
          ],
        },
      ],
    },
  },

  {
    id: 5,
    name: "Electronics",
    icon: "camera",
    image: "/categories/electronics.jpg",
    subMenu: {
      title: "Top Brands",
      sections: [
        {
          heading: "Cameras",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "DSLR Cameras", image: "/items/dslr-camera.jpg" },
            { name: "Mirrorless Cameras", image: "/items/mirrorless-camera.jpg" },
            { name: "Instant Cameras", image: "/items/instant-camera.jpg" }
          ],
        },
        {
          heading: "Drones",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Camera Drones", image: "/items/camera-drone.jpg" },
            { name: "FPV Drones", image: "/items/fpv-drone.jpg" }
          ],
        },
        {
          heading: "Accessories",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Tripods", image: "/items/tripod.jpg" },
            { name: "Camera Bags", image: "/items/camera-bag.jpg" },
            { name: "Memory Cards", image: "/items/memory-card.jpg" }
          ],
        },
        {
          heading: "Audio & Video",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Microphones", image: "/items/microphone.jpg" },
            { name: "Video Lights", image: "/items/video-light.jpg" },
            { name: "Capture Cards", image: "/items/capture-card.jpg" }
          ],
        },
      ],
    },
  },

  {
    id: 6,
    name: "Books & Stationery",
    icon: "book",
    image: "/categories/books-stationery.jpg",
    subMenu: {
      title: "Popular Categories",
      sections: [
        {
          heading: "Books",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Novels", image: "/items/novels.jpg" },
            { name: "Educational Books", image: "/items/educational-books.jpg" },
            { name: "Children's Books", image: "/items/childrens-books.jpg" },
            { name: "Comics", image: "/items/comics.jpg" }
          ],
        },
        {
          heading: "Academic",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "School Books", image: "/items/school-books.jpg" },
            { name: "University Books", image: "/items/university-books.jpg" },
            { name: "Language Learning", image: "/items/language-learning.jpg" }
          ],
        },
        {
          heading: "Stationery",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Pens", image: "/items/pens.jpg" },
            { name: "Notebooks", image: "/items/notebooks.jpg" },
            { name: "Art Supplies", image: "/items/art-supplies.jpg" },
            { name: "Office Supplies", image: "/items/office-supplies.jpg" }
          ],
        },
        {
          heading: "Reading Devices",
          image: "https://i.pinimg.com/736x/1c/8b/0e/1c8b0e7a9d2f5c3a9b4e4d1f1e5a2c9.jpg",
          items: [
            { name: "Kindle", image: "/items/kindle.jpg" },
            { name: "E-Readers", image: "/items/e-readers.jpg" },
            { name: "Book Lights", image: "/items/book-lights.jpg" }
          ],
        },
      ],
    },
  },
];

export const BEST_SELLERS: DealCardType[] = [
  {
    id: 1,
    image: "/B5.avif",
    title: "Nokia BL 5C Battery Phone Battery 5C Nokia BL-5C battery, Nokia phone battery, 5C replacement battery, Nokia battery, Nokia 1100 battery, BL-5C original battery, Nokia mobile accessories, feature phone battery",
    price: 479,
    rate: 4.8
  },
  {
    id: 2,
    image: "/B6.avif",
    title: "360° Rotating Selfie Stick with Built-in Light, Tripod Mount, and Wireless Operation - Black Plastic Selfie Stick for Group Photos, Travel, and Events, Selfie Stick for Phone, Event Photography, Sleek Design, Durable Construction",
    price: 1099,
    rate: 4.6
  },
  {
    id: 3,
    image: "/B7.avif",
    title: "Fast Charger 20W With Lightning USB-C Cable QC 3.0 Charger for iphone 6 7 8 6Plus 6S Plus 7 Plus 8Plus X XS XR 11 11Pro 12 12Mini 12Pro 12Pro Max 13/13 Mini/13 Pro/13 Pro Max",
    price: 1805,
    rate: 4.7
  },
  {
    id: 4,
    image: "/B8.avif",
    title: "100W USB Type-C Fast Charging Cable for Samsung Xiaomi 13 Redmi POCO Huawei Honor OPPO Reno 8 Realme Android USB-C Fast Charger Cord Cable TypeC Data Type-c Fast Cable Fast Charging Type C Data Transferring Supported Cable 100% Original C Type Cable",
    price: 216,
    rate: 4.6
  }
]

export const GIVEAWAY_IMAGES = [
  {
    id: 1,
    src: '/G1.webp',
    alt: 'Giveaway Item 1',
    href: '/giveaway/1',
  },
  {
    id: 2,
    src: '/G2.webp',
    alt: 'Giveaway Item 2',
    href: '/giveaway/2',
  },
  {
    id: 3,
    src: '/G3.webp',
    alt: 'Giveaway Item 3',
    href: '/giveaway/3',
  },
  {
    id: 4,
    src: '/G4.webp',
    alt: 'Giveaway Item 4',
    href: '/giveaway/4',
  },
];

export const CATEGORIES = [
  {
    id: 1,
    src: '/C1.webp',
    alt: 'Giveaway Item 1',
    href: '/giveaway/1',
  },
  {
    id: 2,
    src: '/C2.webp',
    alt: 'Giveaway Item 2',
    href: '/giveaway/2',
  },
  {
    id: 3,
    src: '/C3.webp',
    alt: 'Giveaway Item 3',
    href: '/giveaway/3',
  },
  {
    id: 4,
    src: '/C4.webp',
    alt: 'Giveaway Item 4',
    href: '/giveaway/4',
  },
];

export const PRODUCTS: ProductType[] = [
  {
    id: 1,
    image: "/P11.jpg",
    itemName: "4-Piece Sofa Set with Cushions",
    price: 699.99,
    ratings: 4.3,
    category: "Home & Garden",
    itemType: "Furniture",
    description: "Elegant outdoor patio furniture set perfect for gardens, patios, and balconies.",
    reviews: 85,
    soldQuantity: 180,
  },
  {
    id: 2,
    image: "/P2.jpg",
    itemName: "iPhone 14 Pro Max 256GB",
    price: 1199.99,
    ratings: 4.8,
    category: "Mobile Phones",
    itemType: "Smartphone",
    description: "Latest iPhone with A16 Bionic chip, ProMotion display and incredible camera system.",
    reviews: 210,
    soldQuantity: 350,
  },
  {
    id: 3,
    image: "/P12.jpg",
    itemName: "King Size Comforter Set",
    price: 149.99,
    ratings: 4.6,
    category: "Home & Garden",
    itemType: "Bedding",
    description: "Luxury soft comforter set with pillow shams and quilted stitching.",
    reviews: 102,
    soldQuantity: 300,
  },
  {
    id: 4,
    image: "/P4.jpg",
    itemName: "Canon EOS R50 Mirrorless Camera",
    price: 699.00,
    ratings: 4.6,
    category: "Cameras",
    itemType: "Mirrorless Camera",
    description: "Compact mirrorless camera perfect for creators, with 4K video and interchangeable lenses.",
    reviews: 95,
    soldQuantity: 120,
  },
  {
    id: 5,
    image: "/P13.jpg",
    itemName: "Men’s Waterproof Windbreaker Jacket",
    price: 89.99,
    ratings: 4.4,
    category: "Clothes",
    itemType: "Outerwear",
    description: "Lightweight, stylish and breathable windbreaker with adjustable hood.",
    reviews: 95,
    soldQuantity: 220,
  },
  {
    id: 6,
    image: "/P6.jpg",
    itemName: "Nike Air Max 270 Sneakers",
    price: 149.95,
    ratings: 4.4,
    category: "Footwear",
    itemType: "Sneakers",
    description: "Stylish and comfortable everyday shoes with responsive cushioning and breathable mesh.",
    reviews: 85,
    soldQuantity: 200,
  },
  {
    id: 7,
    image: "/P7.jpg",
    itemName: "Fossil Gen 6 Smartwatch",
    price: 249.99,
    ratings: 4.2,
    category: "Wearables",
    itemType: "Smartwatch",
    description: "Sleek Android-compatible watch with fitness tracking, notifications, and fast charging.",
    reviews: 70,
    soldQuantity: 90,
  },
  {
    id: 8,
    image: "/P8.jpg",
    itemName: "Dyson V15 Detect Cordless Vacuum",
    price: 749.00,
    ratings: 4.8,
    category: "Home Appliances",
    itemType: "Vacuum Cleaner",
    description: "Powerful cordless vacuum with laser dust detection and advanced filtration system.",
    reviews: 130,
    soldQuantity: 230,
  },
  {
    id: 9,
    image: "/P9.jpg",
    itemName: "LEGO Star Wars Millennium Falcon",
    price: 159.99,
    ratings: 4.9,
    category: "Toys",
    itemType: "Building Set",
    description: "1,351-piece LEGO set of the iconic Star Wars ship. Great for ages 9+.",
    reviews: 95,
    soldQuantity: 170,
  },
  {
    id: 10,
    image: "/P10.jpg",
    itemName: "Maybelline Fit Me Matte Foundation",
    price: 9.99,
    ratings: 4.3,
    category: "Beauty",
    itemType: "Cosmetics",
    description: "Lightweight foundation with a matte finish and natural coverage for daily use.",
    reviews: 200,
    soldQuantity: 300,
  },
  {
    id: 11,
    image: "/P1.jpg",
    itemName: "Samsung 55\" QLED Smart TV",
    price: 899.99,
    ratings: 4.5,
    category: "Electronics",
    itemType: "Television",
    description: "Stunning 4K QLED display with Smart features including Netflix, YouTube and Alexa integration.",
    reviews: 120,
    soldQuantity: 240,
  },
  {
    id: 12,
    image: "/P3.jpg",
    itemName: "MacBook Air M2 13-inch",
    price: 1299.00,
    ratings: 4.7,
    category: "Computers",
    itemType: "Laptop",
    description: "Ultra-light Apple laptop with M2 chip and Retina display for blazing performance.",
    reviews: 180,
    soldQuantity: 400,
  },
  {
    id: 13,
    image: "/P5.jpg",
    itemName: "Sony WH-1000XM5 Wireless Headphones",
    price: 349.99,
    ratings: 4.9,
    category: "Audio",
    itemType: "Headphones",
    description: "Industry-leading noise cancellation and premium sound with up to 30 hours battery life.",
    reviews: 310,
    soldQuantity: 600,
  },
  {
    id: 14,
    image: "/P7.jpg",
    itemName: "Women’s High Waist Yoga Leggings",
    price: 39.99,
    ratings: 4.7,
    category: "Clothes",
    itemType: "Activewear",
    description: "Comfortable stretch leggings perfect for yoga, gym or casual wear.",
    reviews: 130,
    soldQuantity: 410,
  },
  {
    id: 15,
    image: "/P8.jpg",
    itemName: "Kids’ Wooden Puzzle Set (6-in-1)",
    price: 24.99,
    ratings: 4.9,
    category: "Children",
    itemType: "Toys",
    description: "Educational and fun puzzles designed for children aged 3–6.",
    reviews: 145,
    soldQuantity: 270,
  },
  {
    id: 16,
    image: "/P9.jpg",
    itemName: "Baby Stroller with Adjustable Canopy",
    price: 229.00,
    ratings: 4.5,
    category: "Children",
    itemType: "Gear",
    description: "Comfortable, lightweight stroller with shock-absorbing wheels and recline function.",
    reviews: 78,
    soldQuantity: 140,
  },
  {
    id: 17,
    image: "/P10.jpg",
    itemName: "Orthopedic Memory Foam Dog Bed",
    price: 59.99,
    ratings: 4.8,
    category: "Pets",
    itemType: "Pet Supplies",
    description: "Soft and supportive bed for small to medium dogs, machine washable cover included.",
    reviews: 160,
    soldQuantity: 320,
  }
];
