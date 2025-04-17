# Form Component Documentation

## Overview

The Form component is a flexible, reusable wrapper around React Hook Form that simplifies form state management and enables easy communication between form inputs.

## Features

- Built-in form state management
- Shared access to form values across child components
- Standardized validation handling
- TypeScript support with generic types
- Clean render prop pattern for accessing form methods

## Usage

```tsx
<Form<YourFormType>
  onSubmit={handleSubmit}
  defaultValues={{
    field1: "default",
    field2: "",
  }}
  mode="onChange"
>
  {({ register, formState: { errors }, watch, setValue, ...methods }) => (
    <>{/* Your form inputs here */}</>
  )}
</Form>
```

## Props

| Prop        | Type                                       | Description                                     |
| ----------- | ------------------------------------------ | ----------------------------------------------- |
| `onSubmit`  | `(data: T) => void`                        | Function to handle form submission              |
| `className` | `string?`                                  | Optional CSS class for the form element         |
| `children`  | `(methods: UseFormReturn<T>) => ReactNode` | Render prop function that receives form methods |

## Examples

### Basic Form

```tsx
<Form<LoginForm>
  onSubmit={handleLogin}
  defaultValues={{ email: "", password: "" }}
>
  {({ register, formState: { errors } }) => (
    <>
      <InputText
        name="email"
        label="Email"
        register={register}
        errors={errors}
        required={true}
      />
      <InputText
        name="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required={true}
      />
      <FormSubmitButton label="Login" />
    </>
  )}
</Form>
```

### Sharing State Between Inputs

```tsx
<Form<OrderForm>
  onSubmit={placeOrder}
  defaultValues={{ product: "", quantity: 1 }}
>
  {({ register, watch, setValue, formState: { errors } }) => {
    const selectedProduct = watch("product");

    return (
      <>
        <InputSelect
          name="product"
          label="Product"
          options={productOptions}
          register={register}
          errors={errors}
          required={true}
        />
        <InputNumber
          name="quantity"
          label="Quantity"
          register={register}
          errors={errors}
          min={1}
          max={selectedProduct === "limited" ? 5 : 100}
        />
        <div>Total: ${calculateTotal(selectedProduct, watch("quantity"))}</div>
        <FormSubmitButton label="Place Order" />
      </>
    );
  }}
</Form>
```

### Form with Dynamic Field Updates

```tsx
<Form<SurveyForm>
  onSubmit={submitSurvey}
  defaultValues={{ surveyType: "", questions: [] }}
>
  {({ register, watch, setValue, formState: { errors } }) => {
    const surveyType = watch("surveyType");

    // Update questions when survey type changes
    React.useEffect(() => {
      if (surveyType) {
        setValue("questions", getSurveyQuestions(surveyType));
      }
    }, [surveyType, setValue]);

    return (
      <>
        <InputSelect
          name="surveyType"
          label="Survey Type"
          options={surveyTypeOptions}
          register={register}
          errors={errors}
          required={true}
        />
        {watch("questions").map((question, index) => (
          <InputTextArea
            key={index}
            name={`answers.${index}`}
            label={question}
            register={register}
            errors={errors}
          />
        ))}
        <FormSubmitButton label="Submit Survey" />
      </>
    );
  }}
</Form>
```

## Best Practices

1. Always specify the type parameter for proper TypeScript support
2. Use the `watch` function to react to form value changes
3. Use `setValue` to programmatically update form values
4. Wrap conditional UI or logic inside the render prop function
5. Leverage `useEffect` for side effects based on form value changes
6. Create custom input components that accept `register` and `errors`
