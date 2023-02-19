import React, { useState, useEffect } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoginStatus } from "../../redux/actions/loginActions";

const PreferenceModal = () => {
  const [open, setOpen] = useState(false);
  const email = useSelector((state) => state.userStatus.userEmail);
  const preselectedBrand = useSelector((state) => state.userStatus.brand);
  const preselectedCategory = useSelector((state) => state.userStatus.category);
  const [brand, setBrand] = useState(preselectedBrand);
  const [category, setCategory] = useState(preselectedCategory);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("preference save attempted!");
    const token = localStorage.getItem("token");
    await axios
      .post(
        "https://project-backend-g96e.onrender.com/preference",
        { email, brand, category },
        { headers: { authorization: `Bearer: ${token}` } }
      )
      .then((res) => {
        console.log("hello", res.data);
        dispatch(
          setLoginStatus({
            result: res.data,
            email: email,
            brand: brand,
            category: category,
          })
        );
        // navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
    setOpen(false);
  };

  return (
    <Modal
      as={Form}
      onSubmit={(e) => handleSubmit(e)}
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button size="small" icon basic inverted>
          <Icon name="edit outline" />
        </Button>
      }
    >
      <Modal.Header>Select Preferences</Modal.Header>
      <Modal.Content>
        <Form.Field
          value={brand}
          name="brand"
          label="Brand"
          control="select"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
          <option value="hp">HP</option>
          <option value="oppo">Oppo</option>
          <option value="huawei">Huawei</option>
          <option value="microsoft">Microsoft</option>
        </Form.Field>
        <Form.Field
          value={category}
          name="category"
          label="Category"
          control="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="home">Home</option>
          <option value="groceries">Grocery</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptops</option>
          <option value="fragrance">Fragrances</option>
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          content="Save"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default PreferenceModal;
