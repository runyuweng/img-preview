import React from 'react';
import { mount } from 'enzyme';
import ImgItem from '../lib/item';

const imgUrl = 'https://avatars2.githubusercontent.com/u/16834265?s=400&u=dd37eb4c227696e1fe47e8354d59b5db53be6959&v=4'

describe('ImgItem', () => {

  const createImgITem = (props) => (
    <ImgItem
      src={props.imgUrl}
    />
  );

  it('Item renders correctly', () => {
    const wrapper = mount(createImgITem({ imgUrl })); 
    expect(wrapper.render()).toMatchSnapshot();
  });
});
