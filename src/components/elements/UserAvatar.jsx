import { Avatar } from '@mui/material';
import { urlEndpoint } from '../../services/url';

const AvatarComponent = ({ url }) => {
    const avatarUrl = `${urlEndpoint}/${url}`;

    return (
        <Avatar alt="Profile Picture" sx={{ width: 56, height: 56 }} src={avatarUrl ? avatarUrl : ''} />
    );
}

export default AvatarComponent;