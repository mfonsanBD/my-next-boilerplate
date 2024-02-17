import clsx from 'clsx'

export interface LogoProps {
  size?: 'small' | 'medium' | 'large' | '3xl'
  color?: 'colorized' | 'white'
}

export default function Logo({ size = 'medium', color = 'white' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 129 70"
      aria-label="AFISCAB"
      className={clsx('relative', {
        'w-28': size === 'small',
        'w-40': size === 'medium',
        'w-72': size === 'large',
        'w-[450px]': size === '3xl',
      })}
    >
      <path
        d="M11.383 44.3712H16.0742L26.4906 68.2145H22.9806C22.6234 68.216 22.2677 68.1688 21.9232 68.0743C21.5913 67.9821 21.2746 67.8421 20.983 67.6586C20.6935 67.4754 20.4305 67.2534 20.2012 66.9988C19.9657 66.7344 19.7746 66.4336 19.6354 66.1081L18.4709 63.4689H8.98634L7.8548 66.1081C7.71751 66.4153 7.52898 66.697 7.29727 66.9411C7.05731 67.1979 6.78637 67.424 6.49068 67.6141C6.19149 67.8082 5.86672 67.9598 5.52573 68.0644C5.19172 68.1707 4.84366 68.2263 4.49315 68.2293H0.959961L11.383 44.3712ZM11.167 58.5139H16.2573L14.1773 53.5209C14.086 53.31 14.0083 53.0934 13.9447 52.8726C13.8886 52.673 13.8457 52.4949 13.8127 52.3399C13.7707 52.1776 13.7426 52.012 13.7286 51.845C13.7055 52.0017 13.6725 52.1749 13.6296 52.3613C13.595 52.5163 13.5488 52.6912 13.4878 52.8941C13.4267 53.097 13.3509 53.3048 13.2634 53.5258L11.167 58.5139Z M39.6519 54.0553V59.1473H30.9162V68.2161H25.4762V44.3728H41.3492V49.4632H30.9162V54.0553H39.6519Z M48.2209 44.3712H42.7628V68.2145H48.2209V44.3712Z M58.4032 49.5968C58.1217 49.5962 57.8407 49.621 57.5636 49.671C57.3114 49.7141 57.0673 49.7953 56.8395 49.9118C56.6425 50.0127 56.4694 50.1544 56.3314 50.3275C56.2023 50.4999 56.1349 50.7108 56.1401 50.9262C56.1218 51.2276 56.2171 51.5248 56.4073 51.7592C56.6318 51.9913 56.905 52.1704 57.2073 52.2838C57.6475 52.4591 58.0975 52.6089 58.5549 52.7324C59.0927 52.8831 59.7222 53.0799 60.4436 53.3229C61.3212 53.6139 62.1659 53.9959 62.964 54.4627C63.6913 54.8854 64.3484 55.4185 64.912 56.0429C65.8154 57.095 66.3894 58.3896 66.5624 59.7654C66.7355 61.1413 66.4999 62.5377 65.8852 63.7807C65.4073 64.7293 64.7418 65.5711 63.929 66.2549C63.0931 66.9549 62.1382 67.499 61.11 67.8615C60.0476 68.2435 58.9268 68.4377 57.7978 68.4355C56.852 68.44 55.9115 68.2936 55.0119 68.0017C54.1489 67.7206 53.3323 67.3131 52.5888 66.7926C51.8527 66.2788 51.1991 65.6558 50.6506 64.9452C50.0993 64.2381 49.6613 63.4496 49.3525 62.6079L51.0828 61.6033C51.3649 61.4459 51.6636 61.3203 51.9735 61.2289C52.2838 61.1353 52.6061 61.0875 52.9302 61.0871C53.3777 61.0805 53.82 61.1836 54.2184 61.3873C54.6011 61.5874 54.9756 61.8035 55.3417 62.0355C55.7079 62.2675 56.0851 62.4836 56.4733 62.6838C56.8865 62.8891 57.3431 62.9921 57.8044 62.984C58.1735 62.9767 58.54 62.9213 58.8947 62.819C59.28 62.7174 59.6496 62.5637 59.9933 62.3621C60.3194 62.1732 60.6047 61.9214 60.8329 61.6215C61.0543 61.3265 61.1704 60.9659 61.1628 60.5972C61.1764 60.2699 61.0662 59.9496 60.8543 59.6998C60.6214 59.4455 60.3413 59.2388 60.0296 59.0912C59.6399 58.9037 59.2369 58.7455 58.8238 58.6178C58.3685 58.4743 57.8918 58.3011 57.3921 58.1015C56.5706 57.7914 55.7607 57.4532 54.9624 57.0871C54.1885 56.7361 53.4669 56.2798 52.818 55.7312C52.1801 55.1853 51.657 54.5181 51.2791 53.7683C50.8854 52.9985 50.6886 52.0413 50.6886 50.8966C50.6709 49.9003 50.8974 48.915 51.3484 48.0265C51.7742 47.211 52.3652 46.4931 53.0836 45.9184C53.8228 45.3341 54.6608 44.8871 55.5578 44.5988C56.4785 44.295 57.4419 44.1408 58.4114 44.1419C59.1175 44.1409 59.8184 44.262 60.4832 44.4999C61.1518 44.7366 61.791 45.0493 62.3883 45.4318C62.9872 45.8146 63.5498 46.2514 64.0692 46.7366C64.5719 47.2055 65.0446 47.7058 65.4844 48.2343L63.8036 49.6495C63.5001 49.9206 63.1466 50.1296 62.7628 50.2648C62.3736 50.3914 61.9662 50.4533 61.557 50.4479C61.2412 50.4537 60.9265 50.4086 60.625 50.3143C60.3704 50.231 60.1204 50.1341 59.8762 50.024C59.6441 49.914 59.411 49.8167 59.1768 49.732C58.9317 49.6422 58.6724 49.5975 58.4114 49.6001 M71.4654 56.2854C71.4604 57.1823 71.6477 58.0699 72.0147 58.8883C72.7282 60.5022 74.0317 61.7822 75.6584 62.466C76.4846 62.8168 77.3737 62.9952 78.2712 62.9905C78.953 62.9933 79.6304 62.8818 80.2753 62.6607C80.8961 62.448 81.4861 62.1546 82.0304 61.7881C82.6192 61.3887 83.3165 61.1797 84.0279 61.1893C84.5365 61.1755 85.0422 61.2688 85.5124 61.4631C85.9346 61.6554 86.3181 61.9232 86.644 62.2532L88.0576 63.6685C87.384 64.3871 86.6525 65.0492 85.8704 65.6479C85.1206 66.2217 84.3181 66.7232 83.4737 67.1456C82.6586 67.5515 81.8027 67.8695 80.9203 68.094C80.0575 68.3124 79.1711 68.4232 78.2811 68.4239C77.1803 68.431 76.0838 68.2879 75.0217 67.9984C73.9969 67.7183 73.0123 67.3075 72.0922 66.7761C69.3393 65.1851 67.3181 62.5802 66.4609 59.5184C65.8715 57.4011 65.8715 55.1631 66.4609 53.0458C66.7459 52.0279 67.1623 51.0514 67.6997 50.1411C68.2314 49.2455 68.8743 48.4208 69.6131 47.6867C70.3531 46.9514 71.1847 46.3145 72.0873 45.7914C73.009 45.2603 73.9952 44.85 75.0217 44.5708C76.0786 44.2804 77.1701 44.135 78.2662 44.1386C79.1563 44.1385 80.0428 44.2493 80.9054 44.4685C81.7881 44.6923 82.6441 45.0103 83.4588 45.417C84.3079 45.8407 85.1144 46.345 85.8671 46.9229C86.6486 47.5218 87.3795 48.1838 88.0526 48.9023L86.639 50.3159C86.3063 50.6484 85.9148 50.9163 85.4844 51.106C85.0225 51.3064 84.5231 51.406 84.0196 51.398C83.3063 51.4035 82.6087 51.1886 82.0221 50.7827C81.4779 50.4065 80.8846 50.1068 80.2588 49.892C79.6205 49.6801 78.952 49.5737 78.2794 49.577C77.3812 49.5718 76.4916 49.7527 75.6667 50.1081C74.8636 50.4513 74.1305 50.9395 73.5042 51.5481C72.8781 52.1568 72.3742 52.8796 72.0197 53.6776C71.6527 54.4966 71.4654 55.3847 71.4704 56.2821 M95.9586 44.3712H100.65L111.066 68.2145H107.554C107.198 68.2159 106.843 68.1687 106.499 68.0743C106.167 67.9821 105.85 67.8421 105.559 67.6586C105.269 67.4754 105.006 67.2534 104.777 66.9988C104.541 66.7344 104.35 66.4336 104.211 66.1081L103.046 63.4689H93.5619L92.4304 66.1081C92.2926 66.4151 92.1041 66.6967 91.8728 66.9411C91.6321 67.1972 91.3613 67.4232 91.0662 67.6141C90.7671 67.8082 90.4423 67.9598 90.1013 68.0644C89.7673 68.1707 89.4192 68.2263 89.0687 68.2293H85.5421L95.9586 44.3712ZM95.7409 58.5139H100.833L98.7528 53.5209C98.6616 53.31 98.5839 53.0934 98.5203 52.8726C98.4642 52.673 98.4196 52.4949 98.3866 52.3399C98.3443 52.1777 98.3167 52.0121 98.3042 51.845C98.2811 52.0017 98.2481 52.1749 98.2035 52.3613C98.1706 52.5163 98.1244 52.6912 98.0633 52.8941C98.0023 53.097 97.9264 53.3048 97.8374 53.5258L95.7409 58.5139Z M114.327 68.2145H110.039V44.3712H120.595C121.575 44.3658 122.545 44.5582 123.449 44.937C124.319 45.2993 125.113 45.8244 125.786 46.4842C126.456 47.1445 126.99 47.9289 127.36 48.7935C127.744 49.6839 127.94 50.6443 127.934 51.6141C127.922 51.9801 127.867 52.3434 127.769 52.6961C127.664 53.1177 127.516 53.5272 127.327 53.9184C127.148 54.2991 126.916 54.6523 126.637 54.9675C126.4 55.251 126.075 55.4472 125.714 55.525C126.196 55.5878 126.647 55.8 127.004 56.132C127.415 56.5045 127.76 56.9433 128.026 57.4302C128.32 57.9582 128.55 58.5198 128.709 59.1027C128.87 59.6584 128.954 60.2333 128.96 60.8116C128.966 61.8071 128.765 62.7931 128.369 63.7064C127.785 65.0488 126.819 66.1901 125.592 66.9891C124.365 67.7881 122.93 68.2095 121.466 68.2013L114.327 68.2145ZM115.482 49.8128V53.4071H120.79C121.017 53.4069 121.242 53.3586 121.45 53.2652C121.656 53.1742 121.842 53.0443 121.999 52.8825C122.155 52.7189 122.278 52.5268 122.362 52.3168C122.452 52.0974 122.497 51.8626 122.495 51.6256C122.496 51.1516 122.32 50.6944 122.001 50.344C121.845 50.1787 121.658 50.0459 121.451 49.9531C121.244 49.8602 121.019 49.8124 120.792 49.8128H115.482ZM121.672 62.7745C121.92 62.7741 122.164 62.7177 122.387 62.6095C122.608 62.5057 122.806 62.3588 122.969 62.1774C123.138 61.9907 123.273 61.7765 123.37 61.544C123.469 61.304 123.52 61.0466 123.518 60.7869C123.52 60.5311 123.473 60.2773 123.378 60.0396C123.287 59.8139 123.155 59.6074 122.987 59.431C122.819 59.2584 122.621 59.1176 122.403 59.0153C122.181 58.9071 121.936 58.8507 121.689 58.8504H115.475V62.7745H121.672Z"
        fill={color === 'white' ? '#FFFFFF' : '#1E40AF'}
      />

      <path
        d="M37.6726 6.4876C37.3468 6.4868 37.0241 6.55036 36.7229 6.67463C36.4217 6.79889 36.148 6.98142 35.9176 7.21173C35.4523 7.67698 35.191 8.30799 35.191 8.96595C35.191 9.62392 35.4523 10.2549 35.9176 10.7202C36.3828 11.1854 37.0138 11.4468 37.6718 11.4468C38.3298 11.4468 38.9608 11.1854 39.426 10.7202L39.4656 10.6839C39.8056 10.3338 40.0344 9.8911 40.1234 9.41133C40.2124 8.93155 40.1576 8.43618 39.9658 7.98751C39.7739 7.53883 39.4537 7.15689 39.0454 6.88971C38.6371 6.62254 38.1589 6.48207 37.671 6.48596M65.0491 23.8055C66.1839 23.8055 67.459 23.7956 68.198 28.0265C68.5081 29.8047 68.9452 32.203 69.567 34.0274C70.052 35.4492 70.5765 36.5016 71.0631 36.3366H71.078C71.812 35.9853 72.4784 33.9185 72.8149 31.2942C73.1744 28.5032 73.0771 25.1911 72.2128 22.5964C72.084 22.2057 71.9308 21.8233 71.7542 21.4517C70.4343 18.7441 68.4143 16.4387 65.9035 14.7746C65.6011 14.5734 65.2938 14.3831 64.9815 14.2039C64.6681 14.3831 64.3607 14.5734 64.0594 14.7746C61.5482 16.4383 59.5281 18.7437 58.2087 21.4517C58.0314 21.823 57.8782 22.2054 57.7501 22.5964C56.8858 25.1861 56.7885 28.5032 57.1481 31.2942C57.478 33.9185 58.151 35.9853 58.885 36.3366H58.8998C59.3848 36.4933 59.911 35.4426 60.3959 34.0274C61.0178 32.203 61.4549 29.8047 61.765 28.0265C62.5039 23.7956 63.779 23.8022 64.9122 23.8055H65.0491ZM65.054 25.5573H64.9056C64.4718 25.5573 63.9819 25.5573 63.4986 28.3284C63.1786 30.1593 62.7266 32.6336 62.0602 34.5964C61.2569 36.9519 60.094 38.5931 58.3456 38.0109C58.2723 37.9863 58.2007 37.9571 58.1312 37.9234C56.8545 37.3115 55.8219 34.6971 55.4112 31.5202C55.0252 28.5082 55.1374 24.9041 56.0891 22.0521C56.2411 21.5904 56.4218 21.1387 56.6301 20.6995C58.0871 17.7056 60.3185 15.1559 63.0928 13.3148L63.1208 13.2967C61.4552 12.6012 59.6721 12.23 57.8672 12.2031C54.7695 12.175 51.9407 12.4389 49.3031 13.1812C46.6075 13.935 44.0949 15.2329 41.9201 16.9948L41.8458 17.0542C42.085 17.1763 42.3192 17.3033 42.5469 17.4385C44.7786 18.7581 46.4528 20.6303 47.9687 22.5932C49.5044 24.5808 50.3951 26.4315 50.913 28.1503C51.3583 29.6852 51.5952 31.273 51.6174 32.8711C51.6536 34.0059 51.5547 34.9659 51.2875 35.601C51.1419 36.0135 50.8479 36.3569 50.4627 36.5643C50.2464 36.6681 50.0086 36.7194 49.7687 36.7139C49.5287 36.7085 49.2935 36.6465 49.0821 36.5329C48.5873 36.3004 48.0231 35.7923 47.3798 34.9494C46.918 34.3441 46.3901 33.6133 45.8656 32.8826C44.4405 30.9032 43.0153 28.9239 43.0087 28.9239C42.8817 28.9882 43.1374 30.4958 43.3881 31.9754C43.4706 32.4703 43.553 32.9486 43.619 33.4402C43.7543 34.443 43.5761 35.5845 43.1638 36.2905C42.9638 36.6629 42.6451 36.9579 42.2582 37.1284C42.0332 37.2192 41.79 37.2559 41.5482 37.2355C41.3064 37.2152 41.0727 37.1384 40.866 37.0113C40.2689 36.6814 39.6058 35.8682 38.9411 34.3721C36.9271 29.8426 36.6599 26.3325 36.6582 26.3226C36.6492 26.2075 36.663 26.0917 36.6987 25.9819C36.7345 25.8721 36.7915 25.7704 36.8666 25.6827C36.9416 25.5949 37.0332 25.5228 37.1362 25.4704C37.2391 25.418 37.3513 25.3865 37.4664 25.3775C37.5816 25.3685 37.6974 25.3823 37.8072 25.418C37.917 25.4538 38.0187 25.5108 38.1064 25.5859C38.1942 25.6609 38.2663 25.7525 38.3187 25.8554C38.371 25.9584 38.4026 26.0706 38.4116 26.1857C38.4116 26.194 38.659 29.427 40.5427 33.6645C40.9897 34.6723 41.3526 35.2117 41.6363 35.4245L41.6446 35.4113C41.8739 35.0154 41.9662 34.321 41.8805 33.676C41.8227 33.2571 41.7386 32.7622 41.6561 32.2674C41.2982 30.161 40.937 28.0183 42.2038 27.3651C43.553 26.6674 45.4219 29.2637 47.2891 31.8599C47.784 32.5445 48.2788 33.2307 48.7736 33.8855C49.0324 34.2576 49.3428 34.5908 49.6957 34.8752C49.8409 34.4661 49.8903 33.7832 49.8607 32.9354C49.8409 31.4883 49.6273 30.0503 49.2256 28.6599C48.7637 27.1276 47.9638 25.4682 46.5765 23.6736C45.1893 21.8789 43.6372 20.1239 41.6561 18.9593C41.219 18.7016 40.7643 18.4751 40.2953 18.2814C38.433 19.7296 36.6912 21.0031 35.2083 21.9532C33.1382 23.281 31.4524 24.0282 30.4248 23.8616C29.6578 23.7346 28.8759 22.9857 28.4669 21.9795C28.2353 21.4084 28.1295 20.794 28.1568 20.1783C28.1875 19.4782 28.4094 18.7999 28.7984 18.2171C29.5704 17.0624 31.1077 16.081 33.8244 15.789C36.2227 15.5317 38.2401 15.7511 39.9803 16.302L40.8198 15.6422C43.1762 13.7307 45.8995 12.3228 48.8215 11.5053C51.6256 10.7152 54.6128 10.4348 57.8755 10.4645C60.3427 10.5005 62.7689 11.1009 64.9683 12.2196C67.1676 11.1009 69.5938 10.5005 72.061 10.4645C75.3221 10.4348 78.3109 10.7152 81.1151 11.5053C84.037 12.3228 86.7604 13.7307 89.1167 15.6422L89.9563 16.302C91.6965 15.7494 93.7138 15.5317 96.1121 15.789C98.8288 16.081 100.366 17.0558 101.138 18.2171C101.527 18.7999 101.749 19.4782 101.78 20.1783C101.807 20.794 101.701 21.4084 101.47 21.9795C101.061 22.9857 100.279 23.7346 99.5117 23.8616C98.4874 24.0266 96.8016 23.281 94.7282 21.9532C93.2437 21.0031 91.5035 19.7296 89.6412 18.2814C89.1722 18.4751 88.7175 18.7016 88.2804 18.9593C86.301 20.1239 84.7654 21.8558 83.36 23.6736C81.9546 25.4913 81.1728 27.1276 80.7109 28.6599C80.3084 30.0502 80.0948 31.4882 80.0759 32.9354C80.0495 33.7832 80.099 34.4661 80.2408 34.8752C80.5935 34.5911 80.9035 34.2578 81.1612 33.8855C81.6561 33.2257 82.1509 32.5445 82.6458 31.8599C84.513 29.2637 86.3818 26.6674 87.7311 27.3651C88.9979 28.0249 88.6367 30.161 88.2788 32.2674C88.1946 32.7622 88.1138 33.2571 88.0544 33.676C87.967 34.321 88.0544 35.0154 88.2903 35.4113V35.4245C88.5724 35.2117 88.9352 34.6723 89.3839 33.6645C91.2676 29.427 91.5134 26.194 91.515 26.1857C91.524 26.0706 91.5556 25.9584 91.608 25.8554C91.6603 25.7525 91.7324 25.6609 91.8202 25.5859C91.908 25.5108 92.0097 25.4538 92.1195 25.418C92.2293 25.3823 92.3451 25.3685 92.4602 25.3775C92.5753 25.3865 92.6875 25.418 92.7905 25.4704C92.8934 25.5228 92.985 25.5949 93.0601 25.6827C93.1351 25.7704 93.1921 25.8721 93.2279 25.9819C93.2636 26.0917 93.2774 26.2075 93.2684 26.3226C93.2684 26.3325 92.9996 29.8426 90.9856 34.3721C90.3258 35.8698 89.666 36.6814 89.059 37.0113C88.8526 37.1383 88.6192 37.2152 88.3777 37.2355C88.1361 37.2558 87.8932 37.2192 87.6684 37.1284C87.2816 36.9579 86.9628 36.6629 86.7629 36.2905C86.3505 35.5812 86.1724 34.443 86.3076 33.4402C86.3736 32.9453 86.4561 32.4637 86.5385 31.9754C86.7893 30.4909 87.0433 28.9882 86.9179 28.9239C86.9179 28.9239 85.4862 30.9032 84.061 32.8826C83.5348 33.6133 83.0087 34.3441 82.5468 34.9494C81.9035 35.7923 81.3361 36.3004 80.8445 36.5329C80.6331 36.6465 80.3979 36.7085 80.158 36.7139C79.9181 36.7194 79.6803 36.6681 79.4639 36.5643C79.0794 36.3562 78.7855 36.013 78.6392 35.601C78.3786 34.9659 78.2796 34.0059 78.3093 32.8711C78.3314 31.273 78.5683 29.6852 79.0136 28.1503C79.5315 26.4315 80.4223 24.5808 81.9579 22.5932C83.4738 20.6303 85.148 18.7515 87.3798 17.4385C87.6074 17.3033 87.8416 17.1763 88.0808 17.0542L88.0066 16.9948C85.8317 15.2329 83.3191 13.935 80.6235 13.1812C77.9843 12.4389 75.1571 12.175 72.0577 12.2031C70.2558 12.2264 68.4749 12.5937 66.8107 13.2851L66.8388 13.3033C69.6272 15.1421 71.8715 17.6951 73.3377 20.6962C73.5454 21.1357 73.726 21.5874 73.8788 22.0488C74.8305 24.9008 74.9427 28.5049 74.5567 31.5169C74.1476 34.6938 73.1134 37.3082 71.8367 37.9201C71.7671 37.9538 71.6955 37.983 71.6223 38.0076C69.8738 38.5898 68.7109 36.9486 67.9076 34.5931C67.2479 32.6369 66.7893 30.1626 66.4693 28.3251C65.9844 25.5507 65.4961 25.5523 65.0623 25.554L65.054 25.5573ZM34.2648 20.467C35.4524 19.7066 36.7968 18.7449 38.2236 17.6628C36.8354 17.4092 35.417 17.3652 34.0157 17.5325C31.9044 17.7602 30.7778 18.415 30.2681 19.182C30.0536 19.5011 29.9314 19.8733 29.9151 20.2575C29.9008 20.6197 29.9644 20.9809 30.1015 21.3165C30.2879 21.7734 30.5304 22.095 30.7118 22.1247C31.2627 22.2154 32.5411 21.5738 34.2599 20.4752M91.7311 17.6711C93.1645 18.7581 94.5088 19.7198 95.6899 20.4752C97.4086 21.5771 98.6886 22.2187 99.2396 22.1247C99.421 22.095 99.6635 21.7734 99.8499 21.3165C99.987 20.9809 100.051 20.6197 100.036 20.2575C100.018 19.8736 99.8964 19.5018 99.6833 19.182C99.1736 18.415 98.047 17.7602 95.9356 17.5325C94.5339 17.3653 93.1149 17.4092 91.7262 17.6628M92.2837 4.73256C93.1222 4.73194 93.9419 4.98007 94.6393 5.44555C95.3367 5.91103 95.8803 6.57293 96.2014 7.34749C96.5224 8.12204 96.6065 8.97443 96.4429 9.79677C96.2793 10.6191 95.8755 11.3745 95.2825 11.9672C94.8889 12.3609 94.4217 12.6732 93.9074 12.8863C93.3932 13.0994 92.842 13.2091 92.2853 13.2091C91.7287 13.2091 91.1775 13.0994 90.6632 12.8863C90.149 12.6732 89.6818 12.3609 89.2882 11.9672C88.894 11.5741 88.5812 11.1072 88.3677 10.593C88.1543 10.0788 88.0444 9.5276 88.0444 8.9709C88.0444 8.4142 88.1543 7.86297 88.3677 7.34881C88.5812 6.83465 88.894 6.36766 89.2882 5.97462C89.3047 5.95647 89.3229 5.93998 89.341 5.92348C90.1309 5.15867 91.1875 4.73152 92.287 4.73256M94.0404 7.21833C93.5811 6.7603 92.961 6.49982 92.3124 6.49242C91.6637 6.48503 91.0379 6.7313 90.5682 7.17874L90.5319 7.21833C90.0667 7.68358 89.8053 8.31459 89.8053 8.97255C89.8053 9.63051 90.0667 10.2615 90.5319 10.7268C90.9972 11.192 91.6282 11.4534 92.2862 11.4534C92.9441 11.4534 93.5751 11.192 94.0404 10.7268C94.5045 10.2606 94.7651 9.62956 94.7651 8.97173C94.7651 8.31389 94.5045 7.68284 94.0404 7.21668M64.9765 0.986583C65.815 0.985967 66.6348 1.2341 67.3321 1.69958C68.0295 2.16506 68.5731 2.82696 68.8942 3.60151C69.2152 4.37607 69.2993 5.22845 69.1357 6.0508C68.9722 6.87314 68.5683 7.62848 67.9753 8.22121C67.5818 8.61492 67.1145 8.92724 66.6003 9.14032C66.086 9.35341 65.5348 9.46308 64.9782 9.46308C64.4215 9.46308 63.8703 9.35341 63.3561 9.14032C62.8418 8.92724 62.3746 8.61492 61.9811 8.22121C61.5871 7.82706 61.2747 7.35904 61.0619 6.84396C60.8491 6.32888 60.74 5.77688 60.741 5.21957C60.7419 4.66227 60.8528 4.11062 61.0673 3.59625C61.2818 3.08188 61.5957 2.61489 61.991 2.22204L62.0454 2.17091C62.8345 1.4059 63.8907 0.978676 64.9897 0.979983M66.7431 3.46575C66.2844 3.00979 65.6659 2.7506 65.0192 2.74321C64.3724 2.73581 63.7483 2.98081 63.2792 3.42616L63.2413 3.46575C62.776 3.931 62.5146 4.56201 62.5146 5.21998C62.5146 5.87794 62.776 6.50895 63.2413 6.9742C63.7065 7.43945 64.3375 7.70082 64.9955 7.70082C65.6534 7.70082 66.2845 7.43945 66.7497 6.9742C67.2151 6.50868 67.4765 5.87739 67.4765 5.21916C67.4765 4.56092 67.2151 3.92963 66.7497 3.4641M34.6772 5.96967C35.4733 5.20968 36.5339 4.78915 37.6345 4.79702C38.7352 4.8049 39.7896 5.24054 40.5748 6.01184C41.3601 6.78314 41.8145 7.8296 41.8421 8.92993C41.8696 10.0303 41.4681 11.0982 40.7225 11.9078L40.6714 11.9622C40.2779 12.3559 39.8106 12.6683 39.2964 12.8814C38.7821 13.0944 38.2309 13.2041 37.6743 13.2041C37.1176 13.2041 36.5664 13.0944 36.0522 12.8814C35.5379 12.6683 35.0707 12.3559 34.6772 11.9622C34.2835 11.5689 33.9712 11.1018 33.7582 10.5877C33.5451 10.0735 33.4354 9.52247 33.4354 8.96595C33.4354 8.40944 33.5451 7.85837 33.7582 7.34425C33.9712 6.83014 34.2835 6.36304 34.6772 5.96967Z M120.765 25.2653C120.734 24.5654 120.512 23.8873 120.124 23.3041C119.35 22.1494 117.814 21.1697 115.096 20.8777C112.698 20.6204 110.68 20.8381 108.942 21.3907C108.663 21.1713 108.384 20.9486 108.102 20.7309C105.744 18.8163 103.019 17.4055 100.094 16.5857C99.1774 16.3304 98.2473 16.1261 97.308 15.9738V17.7569C98.086 17.8917 98.8568 18.0657 99.6173 18.2781C102.313 19.0312 104.826 20.3291 107 22.0917L107.075 22.1511C106.835 22.2715 106.601 22.4002 106.372 22.5338C104.142 23.8534 102.468 25.7255 100.95 27.6884C99.4144 29.676 98.5237 31.5284 98.0058 33.2455C97.5611 34.7811 97.3242 36.3694 97.3014 37.968C97.2668 39.1012 97.3641 40.0628 97.6313 40.6979C97.778 41.1097 98.0717 41.4528 98.4561 41.6612C98.6727 41.7652 98.9109 41.8164 99.1511 41.8106C99.3914 41.8049 99.6269 41.7424 99.8383 41.6282C100.333 41.3956 100.896 40.8892 101.539 40.0463C102.001 39.441 102.529 38.7103 103.053 37.9779C104.478 35.9985 105.905 34.0191 105.912 34.0191C106.037 34.0851 105.781 35.5911 105.531 37.0723C105.448 37.5672 105.366 38.0439 105.3 38.537C105.165 39.5399 105.344 40.6814 105.757 41.3874C105.957 41.7599 106.275 42.0548 106.662 42.2253C106.887 42.3161 107.13 42.3527 107.371 42.3324C107.613 42.3121 107.846 42.2353 108.053 42.1082C108.65 41.7783 109.313 40.9651 109.979 39.469C111.992 34.9395 112.261 31.4311 112.261 31.4212C112.27 31.3061 112.256 31.1903 112.22 31.0804C112.185 30.9706 112.128 30.8688 112.053 30.781C111.978 30.6931 111.886 30.6209 111.783 30.5685C111.68 30.516 111.568 30.4843 111.453 30.4752C111.338 30.4661 111.222 30.4798 111.112 30.5154C111.003 30.5511 110.901 30.608 110.813 30.683C110.725 30.758 110.653 30.8495 110.6 30.9524C110.548 31.0553 110.516 31.1675 110.507 31.2826C110.507 31.2925 110.26 34.5239 108.378 38.7614C107.929 39.7692 107.566 40.3102 107.282 40.523V40.5098C107.052 40.1123 106.953 39.4195 107.047 38.7746C107.103 38.3556 107.187 37.8608 107.271 37.3643C107.627 35.2595 107.99 33.1169 106.722 32.462C105.372 31.7659 103.505 34.3622 101.636 36.9569C101.141 37.643 100.647 38.3292 100.152 38.9841C99.8936 39.3542 99.583 39.6848 99.2297 39.9655C99.0862 39.5581 99.035 38.8752 99.0647 38.0257C99.0844 36.5791 99.298 35.1417 99.6998 33.7519C100.163 32.2179 100.963 30.5602 102.349 28.7655C103.734 26.9709 105.29 25.2158 107.269 24.0496C107.707 23.7931 108.161 23.5672 108.63 23.3734C110.494 24.8216 112.234 26.095 113.719 27.0451C115.787 28.3647 117.475 29.1202 118.502 28.9519C119.269 28.8265 120.051 28.0777 120.459 27.0715C120.691 26.5 120.797 25.885 120.77 25.2686M118.829 26.4117C118.644 26.867 118.4 27.1903 118.22 27.22C117.669 27.309 116.389 26.669 114.67 25.5705C113.484 24.8101 112.14 23.8484 110.712 22.7663C112.101 22.5133 113.519 22.4699 114.921 22.6377C117.033 22.8637 118.157 23.5202 118.669 24.2872C118.882 24.6065 119.004 24.9777 119.022 25.361C119.036 25.7239 118.971 26.0855 118.834 26.4216 M108.262 17.0674C108.656 17.4611 109.123 17.7734 109.637 17.9865C110.151 18.1996 110.703 18.3093 111.259 18.3093C111.816 18.3093 112.367 18.1996 112.881 17.9865C113.396 17.7734 113.863 17.4611 114.256 17.0674C115.028 16.2736 115.458 15.2094 115.455 14.1026C115.452 12.9957 115.016 11.934 114.24 11.1444C113.464 10.3549 112.41 9.90021 111.304 9.87765C110.197 9.85508 109.126 10.2664 108.318 11.0237L108.264 11.0732C107.87 11.4667 107.558 11.9339 107.345 12.4482C107.132 12.9624 107.022 13.5136 107.022 14.0703C107.022 14.6269 107.132 15.1781 107.345 15.6924C107.558 16.2066 107.87 16.6739 108.264 17.0674H108.262ZM109.504 12.3152L109.541 12.2756C110.015 11.8343 110.643 11.5958 111.291 11.611C111.939 11.6262 112.555 11.8939 113.008 12.357C113.461 12.8201 113.715 13.4419 113.717 14.0898C113.718 14.7378 113.466 15.3606 113.014 15.8253C112.784 16.0557 112.511 16.2384 112.21 16.3631C111.909 16.4878 111.586 16.552 111.26 16.552C110.934 16.552 110.612 16.4878 110.311 16.3631C110.01 16.2384 109.736 16.0557 109.506 15.8253C109.276 15.595 109.093 15.3215 108.968 15.0205C108.843 14.7195 108.779 14.3969 108.779 14.0711C108.779 13.7453 108.843 13.4227 108.968 13.1217C109.093 12.8207 109.276 12.5472 109.506 12.3169 M9.46648 27.0682C9.87391 28.0744 10.6558 28.8233 11.4228 28.9486C12.4471 29.1136 14.1329 28.368 16.2063 27.0418C17.6908 26.0917 19.431 24.8183 21.2949 23.3701C21.7636 23.5639 22.2183 23.7898 22.6557 24.0463C24.6351 25.2125 26.1708 26.9428 27.5761 28.7622C28.9815 30.5816 29.7617 32.2146 30.2252 33.7486C30.6253 35.1364 30.8378 36.5716 30.857 38.0158C30.8834 38.8653 30.8322 39.5482 30.692 39.9556C30.3387 39.6749 30.0281 39.3443 29.77 38.9742C29.2751 38.3144 28.7803 37.6331 28.2854 36.947C26.4116 34.3589 24.5477 31.7626 23.1951 32.4587C21.9267 33.1185 22.2896 35.2628 22.6458 37.361C22.73 37.8558 22.8108 38.3507 22.8702 38.7713C22.9576 39.4162 22.8702 40.109 22.6343 40.5065V40.5197C22.3506 40.3069 21.9877 39.7659 21.539 38.7581C19.657 34.5206 19.4096 31.2892 19.4096 31.2793C19.4005 31.1642 19.3688 31.052 19.3163 30.9491C19.2639 30.8462 19.1916 30.7547 19.1038 30.6797C19.016 30.6047 18.9142 30.5478 18.8044 30.5121C18.6945 30.4765 18.5787 30.4628 18.4636 30.4719C18.3485 30.481 18.2362 30.5127 18.1334 30.5652C18.0305 30.6176 17.9389 30.6898 17.864 30.7777C17.789 30.8655 17.732 30.9673 17.6964 31.0771C17.6607 31.187 17.6471 31.3028 17.6562 31.4179C17.6562 31.4278 17.925 34.9362 19.9374 39.4657C20.5972 40.9651 21.2652 41.775 21.864 42.1049C22.0704 42.232 22.3038 42.3088 22.5453 42.3291C22.7868 42.3494 23.0298 42.3128 23.2545 42.222C23.6414 42.0515 23.9601 41.7566 24.1601 41.3841C24.5724 40.6731 24.7522 39.5366 24.617 38.5338C24.5493 38.0389 24.4685 37.5556 24.386 37.069C24.1353 35.5845 23.8797 34.0818 24.005 34.0158C24.005 34.0158 25.4384 35.9952 26.8636 37.9746C27.3898 38.707 27.9159 39.4377 28.3778 40.043C29.0211 40.8859 29.5869 41.3923 30.0784 41.6249C30.2899 41.7391 30.5253 41.8016 30.7656 41.8073C31.0058 41.8131 31.244 41.7619 31.4607 41.6579C31.845 41.4495 32.1388 41.1064 32.2854 40.6946C32.5477 40.0595 32.645 39.0979 32.6153 37.9647C32.5925 36.3661 32.3556 34.7779 31.911 33.2422C31.3914 31.5251 30.5023 29.6727 28.9667 27.6851C27.4491 25.7222 25.7749 23.8435 23.5432 22.5305C23.3155 22.3969 23.0813 22.2682 22.8421 22.1478L22.9164 22.0884C25.0908 20.3258 27.6036 19.0279 30.2994 18.2748C31.06 18.0624 31.8307 17.8884 32.6087 17.7536V15.9738C31.6706 16.1262 30.7416 16.3305 29.826 16.5857C26.9043 17.4039 24.1812 18.8118 21.8244 20.7226C21.5423 20.9486 21.2636 21.1713 20.9848 21.3824C19.2463 20.8315 17.2289 20.6138 14.8306 20.8711C12.1123 21.1631 10.5766 22.1379 9.80298 23.2975C9.41469 23.8807 9.19284 24.5588 9.16133 25.2587C9.13435 25.8751 9.24069 26.4901 9.47308 27.0616M10.9147 25.3412C10.9329 24.9579 11.0549 24.5867 11.2677 24.2674C11.7791 23.5004 12.904 22.8439 15.0153 22.6179C16.417 22.4501 17.836 22.4935 19.2248 22.7466C17.7914 23.8352 16.4471 24.7969 15.2661 25.5507C13.5473 26.6525 12.2673 27.2925 11.7164 27.2002C11.5366 27.1705 11.2925 26.8472 11.1077 26.3919C10.97 26.0559 10.9059 25.6942 10.9197 25.3313 M21.6611 17.0674C22.0548 16.6739 22.3671 16.2066 22.5802 15.6924C22.7933 15.1781 22.903 14.6269 22.903 14.0703C22.903 13.5136 22.7933 12.9624 22.5802 12.4482C22.3671 11.9339 22.0548 11.4667 21.6611 11.0732L21.6067 11.0237C20.7994 10.2664 19.7278 9.85508 18.6212 9.87765C17.5146 9.90021 16.4607 10.3549 15.6849 11.1444C14.9092 11.934 14.4731 12.9957 14.4701 14.1026C14.467 15.2094 14.8972 16.2736 15.6685 17.0674C16.0621 17.4611 16.5293 17.7734 17.0435 17.9865C17.5578 18.1996 18.109 18.3093 18.6656 18.3093C19.2223 18.3093 19.7735 18.1996 20.2878 17.9865C20.802 17.7734 21.2692 17.4611 21.6628 17.0674H21.6611ZM21.1432 14.0719C21.1467 14.5643 21.0033 15.0464 20.7312 15.4568C20.4592 15.8672 20.0709 16.187 19.6161 16.3755C19.1612 16.5639 18.6605 16.6124 18.178 16.5147C17.6954 16.417 17.253 16.1775 16.9073 15.827C16.4558 15.3622 16.2038 14.7394 16.205 14.0915C16.2062 13.4436 16.4605 12.8217 16.9137 12.3586C17.3669 11.8955 17.9831 11.6278 18.6309 11.6126C19.2786 11.5975 19.9067 11.836 20.3811 12.2773L20.4174 12.3169C20.6481 12.5469 20.8311 12.8201 20.956 13.121C21.0808 13.4219 21.145 13.7445 21.1448 14.0703"
        fill={color === 'white' ? '#FFFFFF' : '#E40D1A'}
      />
    </svg>
  )
}
