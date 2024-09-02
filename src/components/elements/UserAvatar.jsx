import { Avatar } from '@mui/material';
import { urlEndpoint } from '../../services/url';

const AvatarComponent = ({ url, size = 56 }) => {
    const avatarUrl = `${urlEndpoint}/${url}`;

    return (
        <Avatar alt="Profile Picture" sx={{ width: size, height: size }} src={avatarUrl ? avatarUrl : ''} />
    );
}

export default AvatarComponent;