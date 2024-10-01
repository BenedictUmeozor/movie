"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@mui/material";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

const AddReviewForm = () => {
  return (
    <div className="mt-8 items-start gap-4 max-lg:space-y-4 lg:flex">
      <div className="grid w-12 place-items-center">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="text-black">BU</AvatarFallback>
        </Avatar>
      </div>
      <form className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          Your rating
          <Rating
            name="simple-controlled"
            defaultValue={2}
            icon={<Star fill="#FFD700" size={20} stroke="#FFD700" />}
            emptyIcon={<Star stroke="#bbb" size={20} />}
          />
        </div>
        <div>
          <Input name="headline" placeholder="Headline of review" />
        </div>
        <div>
          <Textarea
            rows={5}
            className={cn("resize-none")}
            placeholder="Review"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button variant={"ghost"} type="reset">
            Cancel
          </Button>
          <Button
            variant={"default"}
            type="submit"
            className="bg-primary-blue hover:bg-primary-blue/80"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddReviewForm;
