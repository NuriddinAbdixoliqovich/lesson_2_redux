import React from "react";
import Input from "../../../UI/Form/Input";
import ErrorMessage from "../../../UI/Form/ErrorMessage";
import TextArea from "../../../UI/Form/TextArea";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { productService } from "../../../../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ProductCreate() {
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
      name: "",
      brand: "",
    },
  });

  useEffect(() => {
  
    if (id) {
      productService.getById(id).then((res) => {
        const { title, description, price, name, brand } = res;
        reset({
          title,
          description,
          price,
          name,
          brand,
        });
      });
    }
  }, [id]);

  const onSubmit = (values) => {
    if (id) {
      productService.put(values, id).then((res) => {
        navigate(-1);
      });
    } else {
      productService.post(values).then((res) => {
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


      <div className="flex flex-col gap-3 mb-3">
        <label>Name</label>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          {...register("name", {
            required: "required field",
          })}
        />

        <ErrorMessage error={errors?.name?.message} />
      </div>


      <div className="flex flex-col gap-2">
              <label>Brand</label>
              <select
                name="brand"
                className={`${errors.brand?.message && "border-red-500"} border border-[#EAEAEA] p-2 rounded-[3px] focus:outline-none focus:border-green-500 w-[350px] h-10 text-sm text-gray-700` }
                {...register("brand", {required: "required field"})}
                >
              <option disabled value="" selected>Select a brand</option>
              <option value="iPhone">iPhone</option>
              <option value="Samsung">Samsung</option>
              <option value="Vivo">Vivo</option>
              <option value="Redmi">Redmi</option>
              </select>

              <ErrorMessage error={errors?.brand?.message} />
            </div>
      <Button type="submit" variant="contained">
        {id ? "Edit product" : "Add product"}
      </Button>
    </form>
  );
}
