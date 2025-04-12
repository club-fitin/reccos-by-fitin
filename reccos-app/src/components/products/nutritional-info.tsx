import { NutritionalInfo as NutritionalInfoType } from '@/types';

interface NutritionalInfoProps {
  info: NutritionalInfoType;
}

export default function NutritionalInfo({ info }: NutritionalInfoProps) {
  // Define display order and formatting for common nutritional values
  const displayOrder = [
    { key: 'serving_size', label: 'Serving Size' },
    { key: 'calories', label: 'Calories' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'carbs', label: 'Carbohydrates', unit: 'g' },
    { key: 'net_carbs', label: 'Net Carbs', unit: 'g' },
    { key: 'fat', label: 'Total Fat', unit: 'g' },
    { key: 'saturated_fat', label: 'Saturated Fat', unit: 'g' },
    { key: 'trans_fat', label: 'Trans Fat', unit: 'g' },
    { key: 'cholesterol', label: 'Cholesterol', unit: 'mg' },
    { key: 'sodium', label: 'Sodium', unit: 'mg' },
    { key: 'sugar', label: 'Sugar', unit: 'g' },
    { key: 'fiber', label: 'Fiber', unit: 'g' },
  ];
  
  // Collect known nutrient keys in order
  const orderedNutrients = displayOrder
    .filter(item => info[item.key] !== undefined)
    .map(item => ({
      key: item.key,
      label: item.label,
      value: info[item.key],
      unit: item.unit || '',
    }));
  
  // Add any remaining keys that aren't in our display order
  const remainingKeys = Object.keys(info).filter(
    key => !displayOrder.some(item => item.key === key)
  );
  
  remainingKeys.forEach(key => {
    if (key === '_type' || key === '_id') return; // Skip meta fields
    
    orderedNutrients.push({
      key,
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: info[key],
      unit: '',
    });
  });
  
  if (orderedNutrients.length === 0) {
    return <p className="text-gray-500">No nutritional information available.</p>;
  }
  
  return (
    <div className="space-y-2">
      {orderedNutrients.map(nutrient => (
        <div 
          key={nutrient.key}
          className="flex justify-between py-2 border-b border-gray-100 last:border-0"
        >
          <span className="font-medium">{nutrient.label}</span>
          <span className="text-gray-700">
            {typeof nutrient.value === 'number' 
              ? `${nutrient.value}${nutrient.unit}`
              : nutrient.value}
          </span>
        </div>
      ))}
    </div>
  );
} 