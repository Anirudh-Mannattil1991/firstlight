import { generateId } from "@/lib/utils";

export interface NutritionLog {
  id: string;
  date: Date;
  meals: Array<{
    id: string;
    type: "breakfast" | "lunch" | "dinner" | "snack";
    description: string;
    calories?: number;
  }>;
  waterIntake: number;
  notes?: string;
}

// User A: Urban, high-risk pregnancy - nutrition logs over 3 months
export const nutritionLogsUserA: NutritionLog[] = [
  {
    id: generateId(),
    date: new Date(2025, 10, 3),
    meals: [
      { id: generateId(), type: "breakfast", description: "Toast with peanut butter and banana", calories: 320 },
      { id: generateId(), type: "lunch", description: "Chicken rice with vegetables", calories: 450 },
      { id: generateId(), type: "dinner", description: "Lentil soup with bread", calories: 380 },
      { id: generateId(), type: "snack", description: "Yogurt with berries", calories: 150 },
    ],
    waterIntake: 8,
    notes: "Good appetite. Started prenatal vitamins.",
  },
  {
    id: generateId(),
    date: new Date(2025, 10, 10),
    meals: [
      { id: generateId(), type: "breakfast", description: "Oatmeal with milk and honey", calories: 280 },
      { id: generateId(), type: "lunch", description: "Fish with sweet potato and greens", calories: 480 },
      { id: generateId(), type: "dinner", description: "Vegetable curry with rice", calories: 420 },
      { id: generateId(), type: "snack", description: "Almonds and dates", calories: 200 },
    ],
    waterIntake: 9,
    notes: "Feeling nauseous in mornings. Eating smaller, frequent meals.",
  },
  {
    id: generateId(),
    date: new Date(2025, 10, 20),
    meals: [
      { id: generateId(), type: "breakfast", description: "Ginger tea with crackers", calories: 150 },
      { id: generateId(), type: "lunch", description: "Chicken soup with vegetables", calories: 320 },
      { id: generateId(), type: "dinner", description: "Grilled fish with rice", calories: 450 },
      { id: generateId(), type: "snack", description: "Apple with almond butter", calories: 180 },
    ],
    waterIntake: 7,
    notes: "Morning sickness persisting. Eating what I can tolerate.",
  },
  {
    id: generateId(),
    date: new Date(2025, 11, 1),
    meals: [
      { id: generateId(), type: "breakfast", description: "Eggs with whole wheat toast", calories: 340 },
      { id: generateId(), type: "lunch", description: "Beef stew with vegetables", calories: 520 },
      { id: generateId(), type: "dinner", description: "Pasta with tomato sauce and chicken", calories: 480 },
      { id: generateId(), type: "snack", description: "Cheese and crackers", calories: 220 },
    ],
    waterIntake: 8,
    notes: "Morning sickness improving. Appetite returning.",
  },
  {
    id: generateId(),
    date: new Date(2025, 11, 15),
    meals: [
      { id: generateId(), type: "breakfast", description: "Pancakes with berries", calories: 380 },
      { id: generateId(), type: "lunch", description: "Tuna salad with whole grain bread", calories: 420 },
      { id: generateId(), type: "dinner", description: "Chicken with broccoli and brown rice", calories: 500 },
      { id: generateId(), type: "snack", description: "Milk with biscuits", calories: 200 },
    ],
    waterIntake: 9,
    notes: "Feeling much better. Eating well.",
  },
  {
    id: generateId(),
    date: new Date(2025, 11, 28),
    meals: [
      { id: generateId(), type: "breakfast", description: "Cereal with milk and banana", calories: 320 },
      { id: generateId(), type: "lunch", description: "Lamb curry with rice", calories: 550 },
      { id: generateId(), type: "dinner", description: "Grilled fish with vegetables", calories: 480 },
      { id: generateId(), type: "snack", description: "Nuts and dried fruit", calories: 250 },
    ],
    waterIntake: 8,
    notes: "Increased appetite. Eating more frequently.",
  },
  {
    id: generateId(),
    date: new Date(2026, 0, 15),
    meals: [
      { id: generateId(), type: "breakfast", description: "Omelette with cheese and toast", calories: 400 },
      { id: generateId(), type: "lunch", description: "Chicken biryani with yogurt", calories: 600 },
      { id: generateId(), type: "dinner", description: "Lentil dal with rice", calories: 480 },
      { id: generateId(), type: "snack", description: "Fruit smoothie", calories: 280 },
    ],
    waterIntake: 9,
    notes: "Good nutrition. Feeling strong.",
  },
  {
    id: generateId(),
    date: new Date(2026, 1, 10),
    meals: [
      { id: generateId(), type: "breakfast", description: "Toast with eggs and avocado", calories: 420 },
      { id: generateId(), type: "lunch", description: "Beef steak with potatoes and greens", calories: 580 },
      { id: generateId(), type: "dinner", description: "Chicken with rice and vegetables", calories: 520 },
      { id: generateId(), type: "snack", description: "Yogurt with granola", calories: 240 },
    ],
    waterIntake: 8,
    notes: "Swelling in legs starting. Reduced salt intake.",
  },
  {
    id: generateId(),
    date: new Date(2026, 2, 5),
    meals: [
      { id: generateId(), type: "breakfast", description: "Oatmeal with milk", calories: 300 },
      { id: generateId(), type: "lunch", description: "Fish with steamed vegetables", calories: 420 },
      { id: generateId(), type: "dinner", description: "Vegetable soup with bread", calories: 380 },
      { id: generateId(), type: "snack", description: "Apple and almonds", calories: 200 },
    ],
    waterIntake: 10,
    notes: "Doctor advised low-sodium diet. Feeling tired.",
  },
  {
    id: generateId(),
    date: new Date(2026, 3, 1),
    meals: [
      { id: generateId(), type: "breakfast", description: "Eggs with toast", calories: 340 },
      { id: generateId(), type: "lunch", description: "Chicken with rice", calories: 480 },
      { id: generateId(), type: "dinner", description: "Grilled fish with vegetables", calories: 420 },
      { id: generateId(), type: "snack", description: "Milk and cookies", calories: 200 },
    ],
    waterIntake: 9,
    notes: "Resting more. Eating smaller portions due to heartburn.",
  },
];

// User B: Rural, normal pregnancy - nutrition logs with regional foods
export const nutritionLogsUserB: NutritionLog[] = [
  {
    id: generateId(),
    date: new Date(2025, 10, 15),
    meals: [
      { id: generateId(), type: "breakfast", description: "Maize porridge with milk", calories: 280 },
      { id: generateId(), type: "lunch", description: "Beans and cassava", calories: 420 },
      { id: generateId(), type: "dinner", description: "Fish with plantain", calories: 480 },
      { id: generateId(), type: "snack", description: "Groundnuts", calories: 180 },
    ],
    waterIntake: 6,
    notes: "Started prenatal care. Eating local foods.",
  },
  {
    id: generateId(),
    date: new Date(2025, 11, 1),
    meals: [
      { id: generateId(), type: "breakfast", description: "Millet porridge", calories: 300 },
      { id: generateId(), type: "lunch", description: "Chicken stew with yam", calories: 500 },
      { id: generateId(), type: "dinner", description: "Beans with corn bread", calories: 420 },
      { id: generateId(), type: "snack", description: "Mango", calories: 100 },
    ],
    waterIntake: 7,
    notes: "Good appetite. Morning sickness minimal.",
  },
  {
    id: generateId(),
    date: new Date(2025, 12, 10),
    meals: [
      { id: generateId(), type: "breakfast", description: "Sorghum porridge with eggs", calories: 340 },
      { id: generateId(), type: "lunch", description: "Goat meat with vegetables", calories: 520 },
      { id: generateId(), type: "dinner", description: "Lentils with millet bread", calories: 440 },
      { id: generateId(), type: "snack", description: "Papaya", calories: 120 },
    ],
    waterIntake: 8,
    notes: "Eating well. Feeling energetic.",
  },
  {
    id: generateId(),
    date: new Date(2026, 0, 20),
    meals: [
      { id: generateId(), type: "breakfast", description: "Maize and beans", calories: 380 },
      { id: generateId(), type: "lunch", description: "Fish with cassava leaves", calories: 480 },
      { id: generateId(), type: "dinner", description: "Chicken with millet", calories: 500 },
      { id: generateId(), type: "snack", description: "Groundnuts and coconut", calories: 220 },
    ],
    waterIntake: 7,
    notes: "Baby movements felt. Very happy.",
  },
  {
    id: generateId(),
    date: new Date(2026, 2, 1),
    meals: [
      { id: generateId(), type: "breakfast", description: "Sorghum porridge", calories: 300 },
      { id: generateId(), type: "lunch", description: "Beef stew with vegetables", calories: 540 },
      { id: generateId(), type: "dinner", description: "Beans and cassava", calories: 460 },
      { id: generateId(), type: "snack", description: "Banana", calories: 110 },
    ],
    waterIntake: 8,
    notes: "Increased appetite. Eating more.",
  },
  {
    id: generateId(),
    date: new Date(2026, 3, 10),
    meals: [
      { id: generateId(), type: "breakfast", description: "Millet with milk", calories: 320 },
      { id: generateId(), type: "lunch", description: "Fish with yam and greens", calories: 520 },
      { id: generateId(), type: "dinner", description: "Chicken with corn bread", calories: 480 },
      { id: generateId(), type: "snack", description: "Groundnuts", calories: 200 },
    ],
    waterIntake: 8,
    notes: "Feeling strong. Baby very active.",
  },
];

// User C: Teenage pregnancy - nutrition logs with recovery pattern
export const nutritionLogsUserC: NutritionLog[] = [
  {
    id: generateId(),
    date: new Date(2025, 11, 28),
    meals: [
      { id: generateId(), type: "breakfast", description: "Toast with jam", calories: 200 },
      { id: generateId(), type: "lunch", description: "Rice with chicken", calories: 380 },
      { id: generateId(), type: "dinner", description: "Pasta with sauce", calories: 360 },
      { id: generateId(), type: "snack", description: "Biscuits", calories: 120 },
    ],
    waterIntake: 4,
    notes: "First visit. Eating irregularly due to school.",
  },
  {
    id: generateId(),
    date: new Date(2026, 0, 15),
    meals: [
      { id: generateId(), type: "breakfast", description: "Cereal with milk", calories: 240 },
      { id: generateId(), type: "lunch", description: "Sandwich with cheese", calories: 320 },
      { id: generateId(), type: "dinner", description: "Rice and beans", calories: 400 },
      { id: generateId(), type: "snack", description: "Apple", calories: 80 },
    ],
    waterIntake: 5,
    notes: "Skipping meals due to school stress.",
  },
  {
    id: generateId(),
    date: new Date(2026, 1, 10),
    meals: [
      { id: generateId(), type: "breakfast", description: "Eggs with toast", calories: 300 },
      { id: generateId(), type: "lunch", description: "Chicken with rice and vegetables", calories: 450 },
      { id: generateId(), type: "dinner", description: "Lentil soup with bread", calories: 380 },
      { id: generateId(), type: "snack", description: "Yogurt", calories: 150 },
    ],
    waterIntake: 7,
    notes: "Improving nutrition. Counseling helping.",
  },
  {
    id: generateId(),
    date: new Date(2026, 2, 5),
    meals: [
      { id: generateId(), type: "breakfast", description: "Oatmeal with banana", calories: 280 },
      { id: generateId(), type: "lunch", description: "Fish with sweet potato", calories: 480 },
      { id: generateId(), type: "dinner", description: "Chicken curry with rice", calories: 520 },
      { id: generateId(), type: "snack", description: "Nuts and fruit", calories: 200 },
    ],
    waterIntake: 8,
    notes: "Better nutrition. Feeling stronger.",
  },
  {
    id: generateId(),
    date: new Date(2026, 3, 5),
    meals: [
      { id: generateId(), type: "breakfast", description: "Eggs with whole wheat toast", calories: 340 },
      { id: generateId(), type: "lunch", description: "Beef stew with vegetables", calories: 520 },
      { id: generateId(), type: "dinner", description: "Chicken with rice", calories: 480 },
      { id: generateId(), type: "snack", description: "Milk with biscuits", calories: 200 },
    ],
    waterIntake: 8,
    notes: "Much better nutrition. Iron supplementation helping.",
  },
];

export const getNutritionLogs = (userId: string) => {
  if (userId === "userA") return nutritionLogsUserA;
  if (userId === "userB") return nutritionLogsUserB;
  if (userId === "userC") return nutritionLogsUserC;
  return [];
};
