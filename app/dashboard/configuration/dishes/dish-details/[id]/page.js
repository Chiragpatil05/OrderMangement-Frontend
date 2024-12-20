// "use client";

// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";
// import { useUpdateDish } from "@/hooks/dish/useUpdateDish";
// import { EditableImage } from "@/components/ImageInput";
// import { Spinner } from "@/components/ui/spinner";
// import { useParams, useRouter } from "next/navigation";
// import { useGetDish } from "@/hooks/dish/useGetDish";
// import SelectMultiple from "@/components/dishes/component/SectMultiple";
// import SelectOne from "@/components/dishes/component/SelectOne";

// function DishDetails() {
//   const { id } = useParams();
//   console.log("dish in component", id);
//   const { dish, loading } = useGetDish(id);
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const { loading: updateDishLoading, handleUpdateDish } = useUpdateDish();
  
//   const [logo, setLogo] = useState("");
//   const [selectedIngredients, setSelectedIngredients] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [selectedOffer, setSelectedOffer] = useState([]);

//   useEffect(() => {
//     if (dish) {
//       setName(dish?.name || "");
//       setPrice(dish?.price?.toString() || "0");
//       setLogo(dish?.logo || "");
//       setSelectedIngredients(dish?.ingredients || []);
//       setSelectedCategory(dish?.category || "");
//       setSelectedOffer(dish?.offer || "");
//     }
//   }, [dish]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const ingredientIds = selectedIngredients?.map((ing) => ing._id.toString());
//     const categoryId = selectedCategory?._id?.toString();
//     const offerId = selectedOffer?._id?.toString();
//     // here in this handleUpdateDish function dish unction  
//     handleUpdateDish(dish._id, {
//       name,
//       price,
//       logo,
//       ingredients: ingredientIds || [],
//       category : categoryId || null,
//       offer : offerId || null
//     });
//   };


//   // if(loading) return <Spinner></Spinner>
//   return (
//     <Dialog open={true}>
//       <DialogContent className="max-w-xl">
//         <DialogHeader>
//           <DialogTitle>Edit Dish</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex justify-around">
//             <div className="flex flex-col">
//               {/* <EditableImage imageUrl={dish?.logo} /> */}
//               <EditableImage
//                 imageUrl={logo}
//                 size={200}
//                 setImageUrl={setLogo}
//                 element={dish}
//               />

//               <div className="space-y-2">
//                 <Label htmlFor="edit-name">Name</Label>
//                 <Input
//                   id="edit-name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter dish name"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="edit-price">Price</Label>
//                 <Input
//                   id="edit-price"
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   placeholder="Enter price in Rupees"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="edit-logo">Image URL</Label>
//                 <Input
//                   id="edit-logo"
//                   type="url"
//                   value={logo}
//                   onChange={(e) => setLogo(e.target.value)}
//                   placeholder="Enter logo URL"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <SelectMultiple
//                 selectedInputs={selectedIngredients || []}
//                 setSelectedInputs={setSelectedIngredients}
//                 type={"ingredient"}
//               />


//               <SelectOne
//                 selectedInput={selectedCategory || null}
//                 setSelectedInput={setSelectedCategory}
//                 type={"category"}
//               />

//               <SelectOne
//                 selectedInput={selectedOffer || null}
//                 setSelectedInput={setSelectedOffer}
//                 type={"offer"}
//               />
               
               
               
//               <DialogFooter>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => router.push(`/dashboard/configuration/dishes`)}
//                 >
//                   Go Back
//                 </Button>
//                 <Button type="submit">
//                   {updateDishLoading ? <Spinner /> : "Save Changes"}
//                 </Button>
//               </DialogFooter>
//             </div>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default DishDetails;


"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDish } from "@/hooks/dish/useUpdateDish";
import { EditableImage } from "@/components/ImageInput";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { useGetDish } from "@/hooks/dish/useGetDish";
import SelectMultiple from "@/components/dishes/component/SectMultiple";
import SelectOne from "@/components/dishes/component/SelectOne";
import { Switch } from "@/components/ui/switch"; // Switch for toggle buttons

function DishDetails() {
  const { id } = useParams();
  const { dish, loading } = useGetDish(id);
  const router = useRouter();

  // States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [bestSeller, setBestSeller] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const { loading: updateDishLoading, handleUpdateDish } = useUpdateDish();

  // Populate states when dish data is available
  useEffect(() => {
    if (dish) {
      setName(dish?.name || "");
      setPrice(dish?.price?.toString() || "0");
      setLogo(dish?.logo || "");
      setSelectedIngredients(dish?.ingredients || []);
      setSelectedCategory(dish?.category || null);
      setSelectedOffer(dish?.offer || null);
      setBestSeller(dish?.bestSeller || false);
      setOutOfStock(dish?.outOfStock || false);
    }
  }, [dish]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientIds = selectedIngredients?.map((ing) => ing._id.toString());
    const categoryId = selectedCategory?._id?.toString();
    const offerId = selectedOffer?._id?.toString();

    handleUpdateDish(dish._id, {
      name,
      price,
      logo,
      ingredients: ingredientIds || [],
      category: categoryId || null,
      offer: offerId || null,
      bestSeller,
      outOfStock,
    });
  };

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-around">
            <div className="flex flex-col">
              <EditableImage
                imageUrl={logo}
                size={200}
                setImageUrl={setLogo}
                element={dish}
              />

              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter dish name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price in Rupees"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-logo">Image URL</Label>
                <Input
                  id="edit-logo"
                  type="url"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="Enter logo URL"
                  required
                />
              </div>

              {/* Best Seller Toggle */}
              <div className="flex items-center justify-between mt-4">
                <Label>Best Seller</Label>
                <Switch
                  checked={bestSeller}
                  onCheckedChange={(value) => setBestSeller(value)}
                />
              </div>

              {/* Out of Stock Toggle */}
              <div className="flex items-center justify-between mt-2">
                <Label>Out of Stock</Label>
                <Switch
                  checked={outOfStock}
                  onCheckedChange={(value) => setOutOfStock(value)}
                />
              </div>
            </div>

            <div>
              <SelectMultiple
                selectedInputs={selectedIngredients || []}
                setSelectedInputs={setSelectedIngredients}
                type={"ingredient"}
              />

              <SelectOne
                selectedInput={selectedCategory || null}
                setSelectedInput={setSelectedCategory}
                type={"category"}
              />

              <SelectOne
                selectedInput={selectedOffer || null}
                setSelectedInput={setSelectedOffer}
                type={"offer"}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/configuration/dishes`)}
                >
                  Go Back
                </Button>
                <Button type="submit">
                  {updateDishLoading ? <Spinner /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DishDetails;
