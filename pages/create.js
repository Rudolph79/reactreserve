import React, { useState, useEffect } from 'react'
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

const CreateProduct = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
    // console.log(product);
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud-name', 'dsnd07h0x');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url
    return mediaUrl;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      // console.log({ mediaUrl });
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      const response = await axios.post(url, payload);
      // console.log({ response });
      // setLoading(false);
      // console.log(product);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Créer un nouveau produit
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message error header="Damn it !" content={error} />
        <Message success icon="check" header="Enregistré !" content="Votre produit a bien été enregistré" />
        <Form.Group widths="equal">
          <Form.Field control={Input} name="name" label="Nom" placeholder="Nom du produit" 
            onChange={handleChange} value={product.name} />
          <Form.Field control={Input} name="price" label="Prix" placeholder="Prix du produit" 
            min="0.00" step="0.01" type="number" onChange={handleChange} value={product.price} />
          <Form.Field control={Input} name="media" type="file" label="Image" 
            content="Choisissez une image" onChange={handleChange} />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field control={TextArea} name="description" label="Description" 
          placeholder="Description du produit" onChange={handleChange} value={product.description} />
        <Form.Field control={Button} disabled={disabled || loading} color="blue" icon="pencil alternate" content="Valider" type="submit" />
      </Form>
    </>
  );
}

export default CreateProduct;
