import { withUrqlClient } from 'next-urql';
import Container from 'src/components/Container';
import CustomLayout from 'src/components/Layout';
import { createUrqlClient } from 'src/utils/createUrqlClient';

const Home = () => {
  return (
    <CustomLayout title="Stack Overflow - Where Developers Learn, Share, & Build Careers">
      <Container>
        <h1>hello world</h1>
      </Container>
    </CustomLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
