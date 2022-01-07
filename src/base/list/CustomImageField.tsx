import * as React from 'react';

const CustomImageField = (props: any) => {
    const { record, source } = props;
    return record ? (
        <div>
            {record[source] ? (
                <img style={{ height: '200px', width: 'auto' }} src={record[source]} alt="" />
            ) : (
                <svg style={{ height: '200px', width: 'auto' }}
                    version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M2404 4682 c-203 -72 -322 -268 -293 -482 33 -239 265 -410 502 -371
190 32 338 182 368 373 29 186 -76 379 -248 461 -61 28 -79 32 -173 34 -82 3
-116 -1 -156 -15z"/>
                        <path d="M786 4605 c-80 -21 -153 -64 -213 -128 -58 -62 -87 -113 -108 -194
-52 -198 44 -407 229 -498 228 -113 480 -26 593 203 33 66 38 85 41 166 3 74
0 103 -18 155 -60 178 -209 294 -393 306 -46 3 -94 -1 -131 -10z"/>
                        <path d="M4110 4609 c-70 -14 -160 -63 -218 -120 -139 -138 -171 -345 -80
-523 27 -52 110 -140 162 -169 145 -85 336 -80 469 11 233 161 264 482 66 681
-105 104 -253 149 -399 120z"/>
                        <path d="M2460 3629 c-138 -12 -286 -65 -397 -140 -68 -46 -168 -144 -220
-213 l-44 -60 203 -203 203 -203 110 109 c60 60 124 116 142 125 46 23 137 21
190 -5 28 -14 90 -70 175 -160 73 -77 203 -207 289 -289 l157 -150 -19 51
c-74 194 -65 441 23 631 36 79 35 84 -37 178 -179 233 -471 356 -775 329z"/>
                        <path d="M3997 3604 c-331 -60 -636 -347 -703 -663 -18 -88 -18 -235 2 -324
22 -104 118 -294 203 -402 93 -119 113 -157 119 -231 9 -121 -48 -218 -163
-275 -56 -27 -72 -31 -127 -27 -90 5 -148 38 -254 140 l-90 87 -191 -198 -192
-198 112 -110 c155 -152 230 -200 394 -249 75 -23 108 -27 218 -27 153 -1 227
14 351 72 113 53 185 103 276 190 161 153 238 336 238 563 0 185 -55 334 -188
511 -100 133 -117 179 -117 307 1 108 23 170 79 217 82 69 208 85 304 37 98
-49 156 -143 156 -254 0 -98 -26 -144 -151 -271 -96 -98 -105 -110 -92 -126
50 -65 343 -403 349 -403 15 0 280 280 319 339 59 86 98 175 122 279 29 118
23 331 -11 437 -133 416 -534 657 -963 579z"/>
                        <path d="M835 3590 c-328 -52 -600 -299 -686 -626 -29 -111 -29 -297 0 -409
24 -92 83 -218 134 -289 26 -36 593 -616 602 -616 1 0 -7 33 -18 73 -16 57
-20 103 -20 227 0 166 12 236 67 372 l26 63 -119 120 c-66 66 -127 136 -136
155 -26 51 -31 147 -11 207 21 62 73 124 134 161 41 24 57 27 132 27 63 0 94
-5 120 -19 19 -10 185 -167 368 -349 l333 -332 195 199 196 199 -324 324
c-333 335 -400 392 -511 443 -144 65 -335 93 -482 70z"/>
                        <path d="M1194 2587 c-209 -219 -283 -404 -271 -676 9 -227 73 -379 216 -519
151 -148 296 -225 483 -258 227 -40 474 26 662 176 67 52 634 639 634 655 1
16 -699 726 -713 723 -7 -2 -97 -90 -200 -196 l-188 -192 96 -99 c83 -86 98
-106 113 -157 69 -239 -173 -444 -394 -333 -101 50 -155 136 -156 249 -1 93
26 144 130 250 72 74 84 91 76 107 -6 10 -94 100 -195 201 l-184 183 -109
-114z"/>
                        <path d="M895 905 c-141 -52 -206 -218 -139 -353 32 -65 84 -108 153 -129 157
-45 296 43 317 201 l7 46 -122 0 -121 0 0 -45 0 -45 65 0 c36 0 65 -4 65 -8 0
-11 -39 -46 -67 -61 -65 -33 -172 7 -210 79 -84 158 100 307 253 204 l37 -26
30 31 c37 36 30 49 -47 88 -63 32 -162 40 -221 18z"/>
                        <path d="M1330 902 c-46 -23 -75 -79 -65 -130 5 -29 25 -54 96 -122 92 -89
108 -119 70 -140 -32 -17 -53 -12 -87 21 l-31 30 -37 -21 c-20 -12 -36 -24
-36 -27 0 -19 50 -68 84 -84 52 -24 90 -23 143 0 50 23 73 62 73 123 0 54 -23
88 -112 163 -72 60 -85 80 -67 101 17 21 54 17 80 -10 l24 -24 34 29 35 29
-25 26 c-48 53 -118 67 -179 36z"/>
                        <path d="M150 897 c0 -20 98 -456 105 -468 4 -5 24 -9 45 -9 44 0 33 -22 96
202 15 54 30 95 33 92 3 -3 24 -69 46 -147 l41 -142 44 0 45 0 52 230 c29 127
52 236 53 243 0 8 -15 12 -44 12 l-44 0 -15 -67 c-8 -38 -23 -105 -33 -151
-10 -46 -21 -77 -24 -70 -4 7 -24 75 -45 151 l-39 137 -37 0 c-42 0 -32 21
-96 -204 -15 -54 -29 -92 -32 -85 -3 8 -18 75 -35 149 l-31 135 -43 3 c-31 2
-42 -1 -42 -11z"/>
                        <path d="M1745 886 c-90 -41 -138 -119 -137 -222 0 -103 48 -179 137 -220 95
-45 239 -23 299 45 18 20 18 23 3 38 -15 15 -19 14 -51 -15 -83 -73 -201 -67
-282 13 -97 97 -72 255 51 318 75 38 178 23 243 -36 21 -19 24 -20 39 -4 16
15 15 18 -2 36 -62 70 -204 92 -300 47z"/>
                        <path d="M2274 886 c-84 -39 -134 -122 -134 -223 0 -71 24 -125 76 -175 51
-49 100 -68 172 -68 139 0 245 109 244 251 0 61 -32 137 -74 176 -69 65 -192
82 -284 39z m164 -28 c65 -16 126 -79 140 -144 29 -134 -61 -247 -195 -247
-147 0 -240 161 -170 293 26 50 56 75 113 95 49 18 54 18 112 3z"/>
                        <path d="M2742 678 c-18 -123 -32 -229 -32 -235 0 -7 9 -13 19 -13 23 0 25 6
47 183 10 75 20 137 23 137 4 0 42 -72 86 -160 44 -88 83 -160 87 -160 5 0 45
73 89 162 44 90 82 164 83 166 2 1 9 -39 15 -90 30 -231 31 -238 57 -238 20 0
23 4 18 28 -2 15 -18 119 -33 230 -16 112 -31 206 -33 208 -3 2 -48 -83 -100
-189 l-96 -192 -94 192 c-51 106 -96 193 -99 193 -3 0 -20 -100 -37 -222z"/>
                        <path d="M3330 665 l0 -235 25 0 25 0 0 110 0 110 59 0 c86 0 119 9 152 42 23
24 29 38 29 74 0 102 -46 134 -195 134 l-95 0 0 -235z m182 185 c21 -6 42 -19
48 -30 14 -26 13 -73 -3 -94 -14 -20 -73 -35 -134 -36 l-43 0 0 79 c0 67 3 80
18 84 31 8 77 7 114 -3z"/>
                        <path d="M3806 809 c-24 -52 -74 -157 -110 -233 -36 -76 -66 -141 -66 -142 0
-2 11 -4 25 -4 22 0 31 11 63 78 l37 77 97 3 97 3 41 -81 c34 -67 44 -80 65
-80 l24 0 -33 73 c-109 236 -178 383 -187 391 -5 6 -26 -27 -53 -85z m89 -95
c19 -42 35 -78 35 -80 0 -2 -34 -4 -75 -4 -41 0 -75 3 -75 6 0 11 69 154 75
154 3 0 21 -34 40 -76z"/>
                        <path d="M4150 665 l0 -235 25 0 25 0 2 177 3 176 153 -176 c84 -97 155 -177
158 -177 2 0 4 106 4 235 0 228 -1 235 -20 235 -19 0 -20 -7 -20 -175 0 -96
-3 -175 -7 -174 -5 0 -75 79 -158 175 -82 95 -153 174 -157 174 -5 0 -8 -106
-8 -235z"/>
                        <path d="M4666 793 c36 -60 70 -112 75 -118 5 -5 9 -62 9 -127 l0 -118 25 0
25 0 0 112 0 112 70 117 c39 65 70 120 70 123 0 3 -11 6 -24 6 -19 0 -34 -18
-81 -95 -32 -52 -59 -95 -60 -95 -1 0 -28 43 -61 95 -51 83 -62 95 -86 95
l-28 0 66 -107z"/>
                    </g>
                </svg>

            )}
        </div>
    ) : null;
}

CustomImageField.defaultProps = {
    addLabel: true,
    label: '画像'
};

export default CustomImageField;
