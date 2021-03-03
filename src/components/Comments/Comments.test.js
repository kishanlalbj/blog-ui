import { shallow } from 'enzyme';
import { findTestByAttr } from '../../../utils';
import Comments from './Comments';

const setUp = (props = {}) => shallow(<Comments {...props}></Comments>);

describe('Comments Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({
      comment: {
        commenterName: 'Kishan',
        commentText: 'New Commenter',
        id: '123',
        replies: [
          {
            id: 1,
            commenterName: 'Kishan',
            commentText: 'losterm'
          }
        ]
      }
    });
  });

  it('should render the comments', () => {
    const commentComponet = findTestByAttr(wrapper, 'comment-section');
    expect(commentComponet.length).toBe(1);
  });

  it('should display replies if exists', () => {
    const replies = findTestByAttr(wrapper, 'replies');
    expect(replies.length).toBe(1);
  });

  it('should not display replies if its empty', () => {
    let newWrapper = setUp({ comment: { replies: [] } });
    const replies = findTestByAttr(newWrapper, 'replies');
    expect(replies.length).toBe(0);
  });

  it('should not display reply', () => {
    wrapper.setState({ isOpen: false });
    let reply = findTestByAttr(wrapper, 'reply');
    expect(reply.length).toBe(0);
  });

  it('should display reply', () => {
    wrapper.setState({ isOpen: true });
    let reply = findTestByAttr(wrapper, 'reply');
    expect(reply.length).toBe(1);
  });
});
