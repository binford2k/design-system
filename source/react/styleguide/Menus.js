import React from 'react';
import StyleguideSection from './partials/StyleguideSection';
import Button from '../library/Button';
import Popover from '../library/Popover';

import Menu from '../library/menu/Menu';
import MenuHeader from '../library/menu/MenuHeader';
import MenuSection from '../library/menu/MenuSection';
import MenuList from '../library/menu/MenuList';

class Menus extends React.Component {
  renderListTarget() {
    return <Button>Open menu with list</Button>;
  }

  renderSectionTarget() {
    return <Button>Open menu with sections</Button>;
  }

  render() {
    const listTarget = this.renderListTarget();
    const sectionTarget = this.renderSectionTarget();

    const listOptions = [
      { id: 0, value: 'option1' },
      { id: 1, value: 'option2' },
    ];

    return (
      <div>
        <h1>Menus</h1>
        <StyleguideSection title="Menu With List">
          <Popover target={ listTarget } className="rc-popover-no-padding">
            <Menu>
              <MenuHeader title="I'm a happy menu title!" />
              <MenuList options={ listOptions }/>
            </Menu>
          </Popover>
        </StyleguideSection>
        <StyleguideSection title="Menu With Sections">
          <Popover target={ sectionTarget } className="rc-popover-no-padding">
            <Menu>
              <MenuHeader title="I'm a happy menu title!" />
              <MenuSection>
                I'm a happy section!
              </MenuSection>
              <MenuSection>
                Me too!
              </MenuSection>
            </Menu>
          </Popover>
        </StyleguideSection>
      </div>
    );
  }
}

export default Menus;
