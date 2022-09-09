import styled from 'styled-components';

const LoadingComponent = styled.ActivityIndicator`
    width: 100%
    height: 100%
    justify-content: center
    align-items: center
    background-color: #68c2ff
`;

const Loading = () => <LoadingComponent size={50} color="white" />;

export default Loading;
