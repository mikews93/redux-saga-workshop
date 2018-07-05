import { assert, spy, stub } from 'sinon';

import { convertQueryStringToAnObject } from './';
import { REQUEST_STATUSES } from '../constants';

export const testChangeLocation = (wrapper, props) => {
  describe('changeLocation', () => {
    it('calls the handleUrlChange action', () => {
      const params = convertQueryStringToAnObject(props.location.search);
      wrapper.instance().changeLocation(params);

      assert.calledWithExactly(
        props.handleUrlChange,
        props.location.search,
        props.history.location.search
      );

      props.history.push.reset();
      props.handleUrlChange.reset();
    });

    it('calls the push method of the history object', () => {
      wrapper.instance().changeLocation({});
      assert.calledOnce(props.history.push);

      props.history.push.reset();
    });
  });
};

export const testClearPagination = (actions, types) => {
  it('creates an action to clear pagination', () => {
    const expectedAction = { type: types.CLEAR_PAGINATION };
    expect(actions.clearPagination()).to.eql(expectedAction);
  });
};

export const testComponentType = (wrapper, type) => {
  const stringType = typeof type === 'function' ? type.displayName : type;

  it(`is a ${stringType}`, () => {
    expect(wrapper).to.have.type(type);
  });
};

export const testEditableZoneComponents = (
  wrapper,
  EditView,
  DefaultView = 'DefaultView'
) => {
  it('renders an EditableZone component', () => {
    expect(wrapper.find('EditableZone')).to.be.present();
  });

  it('renders 2 EditableZoneView components', () => {
    expect(
      wrapper.find('EditableZone').find('EditableZoneView')
    ).to.have.length(2);
  });

  it('renders an EditableZoneView component with the default-view id', () => {
    expect(wrapper.find('EditableZoneView[id="default-view"]')).to.be.present();
  });

  it('renders an EditableZoneView component with the edit-view id', () => {
    expect(wrapper.find('EditableZoneView[id="edit-view"]')).to.be.present();
  });

  it('renders a DefaultView component', () => {
    expect(wrapper.find('EditableZoneView').find(DefaultView)).to.be.present();
  });

  it('renders an EditView component', () => {
    expect(wrapper.find('EditableZoneView').find(EditView)).to.be.present();
  });
};

export const testCardComponents = wrapper => {
  it('renders an Card component', () => {
    expect(wrapper.find('Card')).to.be.present();
  });

  it('Card to have color and size prop', () => {
    const card = wrapper.find('Card').first();
    expect(card).to.have.prop('color');
    expect(card).to.have.prop('size');
  });

  it('renders a CardHeader component', () => {
    expect(wrapper.find('Card').find('CardHeader')).to.have.length(1);
  });

  it('cardHeader to render CardHeaderTitle', () => {
    const cardHeaderTitle = wrapper.find('Card').find('CardHeaderTitle');
    expect(cardHeaderTitle).to.be.present();
  });

  it('cardHeader to render CardHeaderSubTitle', () => {
    const CardHeaderSubTitle = wrapper.find('Card').find('CardHeaderSubTitle');
    expect(CardHeaderSubTitle).to.be.present();
  });

  it('renders a body component', () => {
    expect(wrapper.find('Card').find('CardBody')).to.have.length(1);
  });

  it('CardBody to render CardBodyTitle', () => {
    const CardBodyTitle = wrapper.find('Card').find('CardBodyTitle');
    expect(CardBodyTitle).to.be.present();
  });

  it('CardBody to render CardBodySubTitle', () => {
    const CardBodySubTitle = wrapper.find('Card').find('CardBodySubTitle');
    expect(CardBodySubTitle).to.be.present();
  });

  it('renders a Actions component', () => {
    expect(wrapper.find('Card').find('CardActions')).to.have.length(1);
  });
};

export const testCollapsibleEditableZoneComponents = (
  wrapper,
  EditView,
  CollapsedView,
  DefaultView = 'DefaultView'
) => {
  it('renders an CollapsibleEditableZone component', () => {
    expect(wrapper.find('CollapsibleEditableZone')).to.be.present();
  });

  it('renders 3 EditableZoneView components', () => {
    expect(
      wrapper.find('CollapsibleEditableZone').find('EditableZoneView')
    ).to.have.length(3);
  });

  it('renders an CollapsibleEditableZoneView component with the default-view id', () => {
    expect(wrapper.find('EditableZoneView[id="default-view"]')).to.be.present();
  });

  it('renders an EditableZoneView component with the edit-view id', () => {
    expect(wrapper.find('EditableZoneView[id="edit-view"]')).to.be.present();
  });

  it('renders an ColapsedZoneView component with the edit-view id', () => {
    expect(
      wrapper.find('EditableZoneView[id="collapsed-view"]')
    ).to.be.present();
  });

  it('renders a DefaultView component', () => {
    expect(wrapper.find('EditableZoneView').find(DefaultView)).to.be.present();
  });

  it('renders an EditView component', () => {
    expect(wrapper.find('EditableZoneView').find(EditView)).to.be.present();
  });

  it('renders an ColapseView component', () => {
    expect(
      wrapper.find('EditableZoneView').find(CollapsedView)
    ).to.be.present();
  });
};

/**
 * Tests whether a request is made in the componentDidMount life cycle method of a Component
 *
 * @param {string} entity
 * @param {string} fetchAction
 * @param {string} fetchStatusProp
 * @param {func} makeWrapper
 * @param {object} defaultProps
 */
export const testFetchingInComponentDidMount = (
  entity,
  fetchAction,
  fetchStatusProp,
  makeWrapper,
  defaultProps
) => {
  describe(`fetches ${entity} if its ${fetchStatusProp} prop is`, () => {
    it(`${REQUEST_STATUSES.NOT_LOADED}`, () => {
      const { props, wrapper } = makeWrapper({
        ...defaultProps,
        [fetchAction]: spy(),
        [fetchStatusProp]: REQUEST_STATUSES.NOT_LOADED
      });
      wrapper.instance().componentDidMount();
      assert.calledOnce(props[fetchAction]);
    });

    it(`${REQUEST_STATUSES.FAILED}`, () => {
      const { props, wrapper } = makeWrapper({
        ...defaultProps,
        [fetchAction]: spy(),
        [fetchStatusProp]: REQUEST_STATUSES.FAILED
      });
      wrapper.instance().componentDidMount();
      assert.calledOnce(props[fetchAction]);
    });
  });

  describe(`does not fetch ${entity} if its ${fetchStatusProp} prop is`, () => {
    it(`${REQUEST_STATUSES.LOADING}`, () => {
      const { props, wrapper } = makeWrapper({
        ...defaultProps,
        [fetchAction]: spy(),
        [fetchStatusProp]: REQUEST_STATUSES.LOADING
      });
      wrapper.instance().componentDidMount();
      assert.notCalled(props[fetchAction]);
    });

    it(`${REQUEST_STATUSES.LOADED}`, () => {
      const { props, wrapper } = makeWrapper({
        ...defaultProps,
        [fetchAction]: spy(),
        [fetchStatusProp]: REQUEST_STATUSES.LOADED
      });
      wrapper.instance().componentDidMount();
      assert.notCalled(props[fetchAction]);
    });
  });
};

export const testGoToNextAndPreviousStep = (wrapper, maximum, minimum = 0) => {
  describe('goToNextStep', () => {
    it('increments the step property', () => {
      wrapper.setState({ step: 1 });
      wrapper.instance().goToNextStep();
      expect(wrapper.state().step).to.eql(2);
    });

    it('handles case in which the step property has reached its maximum', () => {
      wrapper.setState({ step: maximum });
      wrapper.instance().goToNextStep();
      expect(wrapper.state().step).to.eql(maximum);
    });
  });

  describe('goToPreviousStep', () => {
    it('reduces the step property', () => {
      wrapper.setState({ step: 3 });
      wrapper.instance().goToPreviousStep();
      expect(wrapper.state().step).to.eql(2);
    });

    it('handles case in which the step property has reached its minimum', () => {
      wrapper.setState({ step: minimum });
      wrapper.instance().goToPreviousStep();
      expect(wrapper.state().step).to.eql(minimum);
    });
  });
};

export const testHandleLimitChange = (wrapper, limit = 25) => {
  describe('handleLimitChange', () => {
    it('calls the changeLocation method', () => {
      const changeLocationStub = stub(wrapper.instance(), 'changeLocation');
      wrapper.instance().handleLimitChange(limit);
      assert.calledOnce(changeLocationStub);

      changeLocationStub.restore();
    });
  });
};

export const testHandlePageChange = (
  wrapper,
  action = 'next',
  newOffset = 10
) => {
  describe('handlePageChange', () => {
    it('calls the changeLocation method', () => {
      const changeLocationStub = stub(wrapper.instance(), 'changeLocation');
      wrapper.instance().handlePageChange(action, newOffset);
      assert.calledOnce(changeLocationStub);

      changeLocationStub.restore();
    });
  });
};

export const testHandleSubmitIsCalled = (
  wrapper,
  props,
  component = 'form'
) => {
  it('calls the handleSubmit prop when submitting', () => {
    wrapper.find(component).simulate('submit');
    assert.calledOnce(props.handleSubmit);
  });
};

export const testHandleUrlChange = (actions, types) => {
  it('creates an action to handle changes in the URL', () => {
    const search = '?offset=0&limit=10';
    const nextSearch = '?offset=10&limit=10';
    const expectedAction = {
      type: types.HANDLE_URL_CHANGE,
      payload: { search, nextSearch }
    };
    expect(actions.handleUrlChange(search, nextSearch)).to.eql(expectedAction);
  });

  it('handles case in which no parameters are received', () => {
    const expectedAction = {
      type: types.HANDLE_URL_CHANGE,
      payload: { search: '', nextSearch: '' }
    };
    expect(actions.handleUrlChange()).to.eql(expectedAction);
  });
};

export const testTableComponentDidMount = (wrapper, props) => {
  describe('componentDidMount', () => {
    it('calls the changeLocation method', () => {
      const changeLocationStub = stub(wrapper.instance(), 'changeLocation');
      const params = convertQueryStringToAnObject(props.location.search);
      wrapper.instance().componentDidMount();
      assert.calledWithExactly(changeLocationStub, params, 'replace');

      changeLocationStub.restore();
    });
  });
};

export const testTableComponentWillReceiveProps = (
  wrapper,
  props,
  nextProps
) => {
  describe('componentWillReceiveProps', () => {
    it('calls the changeLocation method', () => {
      const changeLocationStub = stub(wrapper.instance(), 'changeLocation');
      const params = convertQueryStringToAnObject(nextProps.location.search);
      wrapper.instance().componentWillReceiveProps(nextProps);
      assert.calledWithExactly(changeLocationStub, params, 'replace');

      changeLocationStub.restore();
    });

    it('does not call the changeLocation method when the search prop is equal to the one in nextProps', () => {
      const changeLocationStub = stub(wrapper.instance(), 'changeLocation');
      wrapper.instance().componentWillReceiveProps(props);
      assert.notCalled(changeLocationStub);

      changeLocationStub.restore();
    });
  });
};
