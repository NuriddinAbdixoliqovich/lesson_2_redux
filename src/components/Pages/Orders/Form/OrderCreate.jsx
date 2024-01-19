import React from "react";
import Input from "../../../UI/Form/Input";
import ErrorMessage from "../../../UI/Form/ErrorMessage";
import TextArea from "../../../UI/Form/TextArea";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { orderService } from "../../../../services/orderService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function OrderCreate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: null,
    },
  });

  useEffect(() => {
    // setValue("title", "saLom dunyo");

    if (id) {
      orderService.getById(id).then((res) => {
        const { title, description, price } = res;
        reset({
          title,
          description,
          price,
        });
      });
    }
  }, [id]);

  const onSubmit = (values) => {
    if (id) {
      orderService.put(values, id).then((res) => {
        navigate(-1);
      });
    } else {
      orderService.post(values).then((res) => {
        navigate(-1);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] border-[lightgray] border-[1px] rounded-md p-4"
    >
      <div className="flex flex-col gap-3 mb-3">
        <label>Title</label>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          {...register("title", {
            required: "required field",
          })}
        />

        <ErrorMessage error={errors?.title?.message} />
      </div>
      <div className="flex flex-col gap-3 mb-3">
        <label>Description</label>
        <TextArea
          placeholder="Description"
          name="description"
          {...register("description", {
            required: "required field",
          })}
        />

        <ErrorMessage error={errors?.description?.message} />
      </div>

      <div className="flex flex-col gap-3 mb-3">
        <label>Price</label>
        <Input
          type="number"
          placeholder="Price"
          name="price"
          {...register("price", {
            required: "required field",
          })}
        />

        <ErrorMessage error={errors?.price?.message} />
      </div>

      <Button type="submit" variant="contained">
        {id ? "Edit order" : "Add order"}
      </Button>
    </form>
  );
}
