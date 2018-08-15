import React from 'react';
import { mount } from 'enzyme';
import Popup from '../lib/popup';

const imgUrl = 'https://avatars2.githubusercontent.com/u/16834265?s=400&u=dd37eb4c227696e1fe47e8354d59b5db53be6959&v=4'

describe('ImgItem', () => {

  const createPopup = (props) => (
    <Popup src={props.src} />
  );

  it('Popup renders correctly', () => {
    const wrapper = mount(createPopup({ src: imgUrl })); 
    expect(wrapper.render()).toMatchSnapshot();
  });
});
