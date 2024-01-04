import Link from "next/link";
import { useEffect, useState } from "react";
import { breadCrumbs } from "../../utils/api";
const PageBanner = ({ pageName, pageTitle }) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  const bgImage = async () => {
    const data = await breadCrumbs();
    setBackgroundImage(data.image_path);
  };

  useEffect(() => {
    bgImage();
  }, []);

  const backgroundStyle = {
    background: `url(${backgroundImage}) no-repeat center center / cover`,
  };

  return (
    <section
      className="page-banner text-white py-165 rpy-130"
      style={backgroundStyle}
    >
      <div className="container">
        <div className="banner-inner">
          <h1 className="page-title wow fadeInUp delay-0-2s">
            {pageTitle ? pageTitle : pageName}
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">{pageName}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default PageBanner;
