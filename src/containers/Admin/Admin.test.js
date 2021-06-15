import { shallow } from 'enzyme';
import { findTestByAttr, storeFactory } from '../../../utils';
import Admin from './Admin';

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);

  return shallow(<Admin store={store}></Admin>)
    .dive()
    .dive();
};

describe('Admin Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({ match: { params: 123 } });
  });

  it('should render admin component', () => {
    const adminComponent = findTestByAttr(wrapper, 'admin-component');
    expect(adminComponent.length).toBe(1);
  });
});
