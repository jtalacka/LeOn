import React from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

interface Props {
    channels: Api.Subject[];
    currentChannel: number;
    onChannelChange: any;
    onClassChange: any;
    classRooms: Api.ClassroomDto[];
}

class Channels extends React.Component<Props> {
    public render(): React.ReactNode {
        const { channels, currentChannel, onChannelChange, classRooms } = this.props;

        return (
      <Menu
        defaultSelectedKeys={[currentChannel.toString()]}
        defaultOpenKeys={['sub1']}
        mode="inline">
        <SubMenu key="sub1" title="Channels">
          {this.props.channels &&
            this.props.channels
            .sort((a, b) => (a.name > b.name) ? 1 : -1)
            .map(channel => (
              <Menu.Item onClick={() => this.props.onChannelChange(channel.id)} key={channel.id}>
                {channel.name}
              </Menu.Item>
            ))}
            {this.props.classRooms &&
            this.props.classRooms
            .sort((a, b) => (a.classroomName > b.classroomName) ? 1 : -1)
            .map(classroom => (
              <Menu.Item
                onClick={() => this.props.onClassChange(classroom.classroomName)}
                key={classroom.classroomName}
              >
                {classroom.classroomName}
              </Menu.Item>
            ))}
        </SubMenu>
      </Menu>
        );
    }
}

export { Channels };
