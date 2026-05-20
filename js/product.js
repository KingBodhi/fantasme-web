const PRODUCTS = {

    /* ══ GRAPHIC TEES ══ */

    fever: {
        name: 'Fever',
        collection: 'SS26 — Drop 001',
        colorway: 'Graphic Tee — Washed Slate',
        price: '$485',
        badge: null,
        img: 'assets/img/tee-fever.jpg',
        bio: 'Excavated from the static. A broadcast no one claimed, a signal no one could explain. The frequency never went dark — it was simply rerouted.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Heavyweight Cotton, 380gsm',
                    'Washed and mechanically distressed',
                    'Boxy oversized silhouette with dropped shoulders',
                    'Ribbed crewneck collar',
                    'Double-stitched hem and cuffs'
                ]
            },
            {
                title: 'Fit & Sizing',
                body: [
                    'Oversized fit. Model is 6\'1" (185cm) and wears size M.',
                    'For a standard oversized fit, take your usual size.',
                    'For a more exaggerated drop-shoulder silhouette, size up one.'
                ]
            },
            {
                title: 'Care',
                body: [
                    'Machine wash cold, inside out',
                    'Wash with like colors only',
                    'Do not tumble dry — lay flat or hang to dry',
                    'Do not bleach or dry clean',
                    'Iron inside out on low heat only'
                ]
            },
            {
                title: 'Shipping & Returns',
                body: [
                    'Complimentary shipping on orders over $250',
                    'Standard delivery: 3–7 business days',
                    'Express delivery: 1–2 business days',
                    'Returns accepted within 14 days, unworn with original tags attached',
                    'Final sale items cannot be returned or exchanged'
                ]
            }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },

    'black-rite': {
        name: 'Black Rite',
        collection: 'SS26 — Drop 001',
        colorway: 'Graphic Tee — Washed Black',
        price: '$475',
        badge: null,
        img: 'assets/img/tee-black-rite.jpg',
        bio: 'Massachusetts, 1692. The courts could not explain it then. The legislature still refuses to. Some guilts are not meant to be cleared — only worn.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Heavyweight Cotton, 380gsm',
                    'Enzyme washed and garment-dyed black',
                    'Boxy oversized silhouette — cut wider through the body',
                    'Ribbed crewneck collar',
                    'Double-stitched hem and cuffs'
                ]
            },
            {
                title: 'Fit & Sizing',
                body: [
                    'Boxy oversized fit. Model is 6\'0" (183cm) and wears size M.',
                    'The cut runs true to the size chart. Size up for a more exaggerated silhouette.'
                ]
            },
            {
                title: 'Care',
                body: [
                    'Machine wash cold, inside out',
                    'Wash separately — color may transfer initially',
                    'Do not tumble dry — lay flat to preserve garment dye',
                    'Do not bleach or dry clean'
                ]
            },
            {
                title: 'Shipping & Returns',
                body: [
                    'Complimentary shipping on orders over $250',
                    'Standard delivery: 3–7 business days',
                    'Returns accepted within 14 days, unworn with original tags attached'
                ]
            }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },

    unidentified: {
        name: 'Unidentified',
        collection: 'SS26 — Drop 001',
        colorway: 'Graphic Tee — White',
        price: '$455',
        badge: 'New',
        img: 'assets/img/tee-unidentified.jpg',
        bio: 'Coast Guard photograph, July 16. Four objects in V-formation. No explanation was ever officially issued. Some things are left unresolved by design.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Heavyweight Cotton, 380gsm',
                    'Raw optical white — unprocessed base',
                    'Boxy oversized silhouette with dropped shoulders',
                    'Ribbed crewneck collar',
                    'Double-stitched hem and cuffs',
                    'Screen-printed archival graphic'
                ]
            },
            {
                title: 'Fit & Sizing',
                body: [
                    'Boxy oversized fit. Model is 5\'10" (177cm) and wears size M.',
                    'For a more cropped, boxy look: size down. For extra length: size up.'
                ]
            },
            {
                title: 'Care',
                body: [
                    'Machine wash cold, inside out',
                    'Wash separately — do not wash with dark colors',
                    'Do not tumble dry',
                    'Do not bleach',
                    'Iron inside out only — avoid direct contact with graphic'
                ]
            },
            {
                title: 'Shipping & Returns',
                body: [
                    'Complimentary shipping on orders over $250',
                    'Standard delivery: 3–7 business days',
                    'Returns accepted within 14 days, unworn with original tags attached'
                ]
            }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },

    'the-subject': {
        name: 'The Subject',
        collection: 'SS26 — Drop 001',
        colorway: 'Graphic Tee — Washed Plum',
        price: '$495',
        badge: 'New',
        img: 'assets/img/tee-subject.jpg',
        bio: 'Military file. Declassified. One image, no further comment. The creature in the photograph has never been publicly identified. You are now looking at what they found.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Heavyweight Cotton, 380gsm',
                    'Acid washed and pigment-dyed in plum',
                    'Relaxed oversized silhouette — softer through the shoulders',
                    'Ribbed crewneck collar',
                    'Double-stitched hem and cuffs',
                    'Scattered typeface: hand-placed brand lettering'
                ]
            },
            {
                title: 'Fit & Sizing',
                body: [
                    'Relaxed oversized fit. Model is 6\'1" (185cm) and wears size M.',
                    'The silhouette is slightly softer and more draped than other pieces in this drop.'
                ]
            },
            {
                title: 'Care',
                body: [
                    'Machine wash cold, inside out',
                    'Wash separately — color may transfer initially',
                    'Do not tumble dry — lay flat to preserve dye uniformity',
                    'Do not bleach or dry clean'
                ]
            },
            {
                title: 'Shipping & Returns',
                body: [
                    'Complimentary shipping on orders over $250',
                    'Standard delivery: 3–7 business days',
                    'Returns accepted within 14 days, unworn with original tags attached'
                ]
            }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },

    /* ══ TOPS ══ */

    'polo-marilyn': {
        name: 'The Icon',
        collection: 'SS26 — Drop 001',
        colorway: 'Polo Shirt — Midnight Black',
        price: '$625',
        badge: 'Limited',
        img: 'assets/img/polo-marilyn.jpg',
        bio: 'She was never just a symbol — she was a frequency. Sequin-fringed chest, archival portrait, and the quiet violence of being remembered.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Egyptian Cotton piqué body',
                    'Iridescent sequin fringe panel across chest',
                    'Archival Marilyn portrait printed lower left',
                    'Short sleeve with structured hem',
                    'Peter Pan collar'
                ]
            },
            { title: 'Fit & Sizing', body: ['Regular fit. Model wears size M.', 'Runs true to size.'] },
            { title: 'Care', body: ['Hand wash cold only', 'Do not tumble dry', 'Do not iron sequin panel'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Standard delivery: 3–7 business days', 'Returns accepted within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },

    'shirt-collage': {
        name: 'World Order',
        collection: 'SS26 — Drop 001',
        colorway: 'Button-Down — Optical White',
        price: '$625',
        badge: 'Limited',
        img: 'assets/img/shirt-collage.jpg',
        bio: 'A document assembled from fragments. What culture discards, the archive inherits. Collage as testimony — dancing figures and institutional debris.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Poplin Cotton — optical white',
                    'Classic collar, full button placket, chest pocket',
                    'Screen-printed archival collage across chest and hem',
                    'Vintage dance illustration along left placket',
                    'Slim fit through the body'
                ]
            },
            { title: 'Fit & Sizing', body: ['Slim fit. Model wears size M.', 'Size up for a relaxed silhouette.'] },
            { title: 'Care', body: ['Machine wash cold, inside out', 'Wash separately — whites only', 'Iron inside out on low heat'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Standard delivery: 3–7 business days', 'Returns within 14 days'] }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },

    'shirt-tiger': {
        name: 'Billie',
        collection: 'SS26 — Drop 001',
        colorway: 'Button-Down — Blush / Tiger',
        price: '$615',
        badge: 'Limited',
        img: 'assets/img/shirt-tiger.jpg',
        bio: 'Homage to the King. She says I am the one. But the kid is not my son. The ground lights up when you walk.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Cotton — blush pink',
                    'Tiger-print woven patch on left chest',
                    'Detachable red velvet bow tie at collar',
                    'Full button placket, structured cuffs',
                    'Relaxed fit'
                ]
            },
            { title: 'Fit & Sizing', body: ['Relaxed fit. Runs slightly oversized — size down if between sizes.'] },
            { title: 'Care', body: ['Machine wash cold', 'Remove bow tie before washing', 'Do not bleach', 'Lay flat to dry'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },

    'shirt-cream-bow': {
        name: 'Curtain Call',
        collection: 'SS26 — Drop 001',
        colorway: 'Cropped Shirt — Ivory / Black',
        price: '$645',
        badge: 'Limited',
        img: 'assets/img/shirt-cream-bow.jpg',
        bio: 'The performance is over. What remains is what was always real — the bow, the figure, the silence after applause.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Crepe de Chine — ivory',
                    'Black velvet bow at collar',
                    'Archival figure print on left chest',
                    'Cropped, structured silhouette',
                    'Single button closure'
                ]
            },
            { title: 'Fit & Sizing', body: ['Cropped fit. Model wears size S.', 'Pairs with high-waist bottoms.'] },
            { title: 'Care', body: ['Dry clean preferred', 'Hand wash cold if necessary', 'Do not wring'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L']
    },

    'shirt-black-bow': {
        name: 'Séance',
        collection: 'SS26 — Drop 001',
        colorway: 'Cropped Shirt — Noir / Velvet',
        price: '$665',
        badge: 'Limited',
        img: 'assets/img/shirt-black-bow.jpg',
        bio: 'A building remembered only by its ruin. The velvet bow says it was once beautiful. The archival photograph says it no longer stands.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Satin-Crepe — black',
                    'Black velvet ribbon bow at collar',
                    'Archival building photograph printed on chest',
                    'Cropped, structured silhouette with button placket',
                    'Extended cuffs'
                ]
            },
            { title: 'Fit & Sizing', body: ['Cropped fit. Model wears size S.', 'Best worn high-waisted.'] },
            { title: 'Care', body: ['Dry clean only', 'Steam lightly if needed', 'Do not iron velvet bow'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L']
    },

    'top-corset': {
        name: 'The Grip',
        collection: 'SS26 — Drop 001',
        colorway: 'Structured Top — Black',
        price: '$675',
        badge: 'Limited',
        img: 'assets/img/top-corset.webp',
        bio: 'Architecture against the body. Boned seaming, hip-band pockets, and a satin bow — restraint performed as elegance.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Structured wool-crepe body with boned seaming',
                    'Satin ribbon bow at center front',
                    'Hip-level satin-bound pockets',
                    'Broad shoulder straps',
                    'Back zipper closure',
                    'Fully lined interior'
                ]
            },
            { title: 'Fit & Sizing', body: ['Body-fitted silhouette. Size up if between sizes.', 'Model wears size S.'] },
            { title: 'Care', body: ['Dry clean only', 'Do not machine wash — structure will distort'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L']
    },

    'vest-blood': {
        name: 'Red Mist',
        collection: 'SS26 — Drop 001',
        colorway: 'Sleeveless Vest — Ivory / Crimson',
        price: '$595',
        badge: 'Limited',
        img: 'assets/img/vest-blood.jpg',
        bio: 'Something happened here. The fabric holds the memory. The splatter is too precise to be accidental — this was designed to disturb.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Silk organza — ivory white',
                    'Pixelated blood-splatter print across body',
                    'Open notch collar, sleeveless',
                    'Button-front placket',
                    'Banded hem'
                ]
            },
            { title: 'Fit & Sizing', body: ['Relaxed boxy fit. Runs oversized — size down if between sizes.'] },
            { title: 'Care', body: ['Dry clean preferred', 'Spot clean silk only', 'Do not bleach'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L']
    },

    /* ══ OUTERWEAR ══ */

    'jacket-cargo': {
        name: 'Signal',
        collection: 'SS26 — Drop 001',
        colorway: 'Technical Bomber — Black',
        price: '$1,650',
        badge: 'Limited',
        img: 'assets/img/jacket-cargo.jpg',
        bio: 'Worn by those who move between frequencies. The pockets hold more than objects. The signal remains encrypted.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Waxed cotton-nylon shell — matte black',
                    'Full zip center front with snap placket',
                    'Dual cargo pockets at hip with zip detail',
                    'Curved side-entry pockets',
                    'Ribbed knit cuffs and hem band',
                    'Padded lining'
                ]
            },
            { title: 'Fit & Sizing', body: ['Relaxed fit. Model wears size M.', 'Size down for a more structured silhouette.'] },
            { title: 'Care', body: ['Spot clean or hand wash cold', 'Do not machine wash', 'Hang dry only', 'Reproofing may be required after washing'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Standard delivery: 3–7 business days', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },

    'blazer-glitter': {
        name: 'Constellation',
        collection: 'SS26 — Drop 001',
        colorway: 'Tailored Blazer — Black Lurex',
        price: '$2,200',
        badge: 'Limited',
        img: 'assets/img/blazer-glitter.jpg',
        bio: 'The night sky compressed into tailoring. Every thread carries light — you are not dressed, you are illuminated.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Black wool-blend with woven lurex — light-catching throughout',
                    'Peak lapels, single-button closure',
                    'Welt pockets at hip',
                    'Structured shoulder pads',
                    'Full silk lining'
                ]
            },
            { title: 'Fit & Sizing', body: ['Slim fit. Model wears size 38. Size up for a relaxed silhouette.'] },
            { title: 'Care', body: ['Dry clean only', 'Store on a padded hanger'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn, with original tags'] }
        ],
        sizes: ['34', '36', '38', '40', '42', '44']
    },

    'blazer-zip': {
        name: 'The Descent',
        collection: 'SS26 — Drop 001',
        colorway: 'Cropped Blazer — Black / Silver Hardware',
        price: '$2,450',
        badge: 'Limited',
        img: 'assets/img/blazer-zip.jpg',
        bio: 'Where structure ends and aggression begins. Oversized zippers, shoulder hardware, contrast stitching — a blazer that refuses to behave.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Technical gabardine — black',
                    'Oversized silver zippers — front, sleeve, and hip',
                    'Silver pin-stud shoulder hardware',
                    'Contrast white stitching at seams',
                    'Single button closure with notch lapel',
                    'Cropped, rigid silhouette'
                ]
            },
            { title: 'Fit & Sizing', body: ['Cropped oversized fit. Model wears size 38.', 'True to size.'] },
            { title: 'Care', body: ['Dry clean only', 'Handle hardware carefully to prevent scratching'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['34', '36', '38', '40', '42']
    },

    'jacket-leather': {
        name: 'Second Skin',
        collection: 'SS26 — Drop 001',
        colorway: 'Leather Bomber — Distressed Black',
        price: '$4,200',
        badge: 'Limited',
        img: 'assets/img/jacket-leather.jpg',
        bio: 'The leather remembers everything. Every crease is autobiography. Wear it long enough and it becomes impossible to tell where the jacket ends and you begin.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Full-grain calf leather — pre-distressed black',
                    'Full zip center front',
                    'Paneled construction at chest and shoulder for ergonomic drape',
                    'Slash pockets at hip',
                    'Ribbed knit cuffs and hem band',
                    'Silk-blend lining'
                ]
            },
            { title: 'Fit & Sizing', body: ['Slim fit. Model wears size 38.', 'Leather will break in and conform to the body over time.'] },
            { title: 'Care', body: ['Professional leather cleaning only', 'Condition with leather balm every 6 months', 'Do not expose to prolonged moisture'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn — final sale on leather goods after first wear'] }
        ],
        sizes: ['34', '36', '38', '40', '42', '44']
    },

    'coat-chain': {
        name: 'The Colonel',
        collection: 'SS26 — Drop 001',
        colorway: 'Double-Breasted Coat — Navy / Gold',
        price: '$5,800',
        badge: 'Limited',
        img: 'assets/img/coat-chain.jpg',
        bio: 'Authority, inherited. Double-breasted structure, chain-trim lapels, military silhouette — this is what power looks like when it dresses for the archive.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Ribbed tweed-wool — deep navy',
                    'Gold chain-link trim at all edges and buttonholes',
                    'Double-breasted, 8-button closure with gold hardware',
                    'Military-notch lapels',
                    'Two hip welt pockets',
                    'Full silk lining'
                ]
            },
            { title: 'Fit & Sizing', body: ['Structured, relaxed fit. Model wears size 38.'] },
            { title: 'Care', body: ['Dry clean only', 'Store on a wide, padded hanger', 'Avoid prolonged compression of chain trim'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['34', '36', '38', '40', '42']
    },

    'coat-fur': {
        name: 'Witness',
        collection: 'SS26 — Drop 001',
        colorway: 'Fur Coat — Sable / Cream',
        price: '$8,500',
        badge: 'Limited',
        img: 'assets/img/coat-fur.jpg',
        bio: 'The rarest thing we carry. A witness to decades. Brown sable body, cream shearling lapels — the coat that has outlived everything worn under it.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Vintage mink — sable brown',
                    'Contrast cream shearling lapels',
                    'Three-button closure',
                    'Hip pockets',
                    'Fully lined in vintage silk'
                ]
            },
            { title: 'Fit & Sizing', body: ['Vintage sizing — one size available. Contact us for measurements.', 'Relaxed, draping silhouette.'] },
            { title: 'Care', body: ['Professional fur storage in summer months', 'Professional cleaning only — no moisture', 'Store loosely — do not compress'] },
            { title: 'Shipping & Returns', body: ['Complimentary insured shipping', 'Final sale — no returns on archive fur pieces'] }
        ],
        sizes: ['One Size']
    },

    /* ══ BOTTOMS ══ */

    'jeans-wax': {
        name: 'Vulture Waxed Denim',
        collection: 'SS26 — Drop 001',
        colorway: 'Slim Jeans — Waxed Black',
        price: '$825',
        badge: 'Limited',
        img: 'assets/img/jeans-wax.jpg',
        bio: 'Denim that refuses to be casual. The wax coating carries a surface memory — every fold, every press becomes permanent.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '98% Cotton, 2% Elastane — coated with black wax finish',
                    'Slim, straight leg silhouette',
                    '5-pocket construction with silver rivets',
                    'Zip fly',
                    'Wax finish deepens with wear'
                ]
            },
            { title: 'Fit & Sizing', body: ['Slim fit. Model wears size 30x32.', 'Runs true to size.'] },
            { title: 'Care', body: ['Wipe clean with damp cloth — do not machine wash', 'Re-wax every 6–12 months to maintain finish', 'Do not tumble dry'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['28', '29', '30', '31', '32', '33', '34', '36']
    },

    'jeans-straight': {
        name: 'Blueprint Denim',
        collection: 'SS26 — Drop 001',
        colorway: 'Straight Jeans — Medium Wash',
        price: '$795',
        badge: 'Limited',
        img: 'assets/img/jeans-straight.jpg',
        bio: 'The original document. Medium wash, straight cut — everything that came after was built on this foundation.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Selvedge denim — medium fade',
                    'High-rise, straight-leg silhouette',
                    '5-pocket construction',
                    'Contrast stitching',
                    'Zip fly with branded hardware'
                ]
            },
            { title: 'Fit & Sizing', body: ['Straight fit, high rise. Model wears size 27x32.', 'Slight stretch — runs true to size.'] },
            { title: 'Care', body: ['Machine wash cold, inside out', 'Wash with like colors', 'Hang to dry — avoid tumble dry to preserve wash'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32']
    },

    'pants-flare': {
        name: 'Flare Denim',
        collection: 'SS26 — Drop 001',
        colorway: 'Flare Pants — Black',
        price: '$815',
        badge: 'Limited',
        img: 'assets/img/pants-flare.jpg',
        bio: 'The signal expands at the hem. Everything compressed at the waist broadcasts outward — this is what amplitude looks like worn.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Heavy twill cotton — black',
                    'High-rise, low-slung flare silhouette',
                    'Five-pocket construction',
                    'Silver tone hardware',
                    'Dramatic below-knee flare'
                ]
            },
            { title: 'Fit & Sizing', body: ['High-rise, fitted through hip, wide flare from knee. Model wears size 27.', 'Size up if between sizes for comfort through seat.'] },
            { title: 'Care', body: ['Machine wash cold', 'Hang to dry — tumble dry will shrink flare panel'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days'] }
        ],
        sizes: ['24', '25', '26', '27', '28', '29', '30', '32']
    },

    'pants-leather': {
        name: 'Phantom Leather',
        collection: 'SS26 — Drop 001',
        colorway: 'Leather Flare Pants — Black',
        price: '$1,850',
        badge: 'Limited',
        img: 'assets/img/pants-leather.jpg',
        bio: 'They should not move this way. Leather is not supposed to flare. This is a contradiction worn on the body.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Full-grain calf leather — black',
                    'High-rise fit, flare from below knee',
                    'Five-pocket construction',
                    'Gold tone hardware',
                    'Paneled leather construction for flexibility'
                ]
            },
            { title: 'Fit & Sizing', body: ['High-rise, slim through hip. Model wears size 27.', 'Leather will soften and conform over time.'] },
            { title: 'Care', body: ['Professional leather cleaning only', 'Condition twice yearly', 'Avoid moisture'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['24', '25', '26', '27', '28', '29', '30']
    },

    'pants-silver': {
        name: 'Static',
        collection: 'SS26 — Drop 001',
        colorway: 'Wide-Leg Pants — Silver Metallic',
        price: '$1,450',
        badge: 'Limited',
        img: 'assets/img/pants-silver.jpg',
        bio: 'The television after the broadcast ends. Pure signal without content. Silver wide-leg — wear the interference.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Lamé-cotton blend — silver metallic finish',
                    'Wide, high-waisted silhouette',
                    'Five-pocket construction',
                    'Silver CC-style button closure',
                    'Contrast white stitching'
                ]
            },
            { title: 'Fit & Sizing', body: ['High-rise, wide leg. Model wears size 28.', 'Runs true to size.'] },
            { title: 'Care', body: ['Dry clean only', 'Do not wring or twist — metallic thread will distort'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['24', '26', '27', '28', '29', '30', '32']
    },

    'pants-teal': {
        name: 'Disco Leather',
        collection: 'SS26 — Drop 001',
        colorway: 'Leather Pants — Ice Blue',
        price: '$1,950',
        badge: 'Limited',
        img: 'assets/img/pants-teal.jpg',
        bio: 'An unexpected frequency. The color of glaciers and dead signals. Straight-cut, panel-stitched — nothing from this collection is supposed to look like this.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    '100% Full-grain calf leather — teal / ice blue',
                    'High-rise, straight-leg silhouette',
                    'Five-pocket construction with silver rivets',
                    'Paneled construction at knee for movement',
                    'Gold-tone button closure'
                ]
            },
            { title: 'Fit & Sizing', body: ['High-rise, slim straight. Model wears size 27.', 'Size up for relaxed fit.'] },
            { title: 'Care', body: ['Professional leather cleaning only', 'Color leather conditioner twice yearly', 'Avoid moisture and direct heat'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['24', '25', '26', '27', '28', '29', '30']
    },

    /* ══ SKIRTS ══ */

    'skirt-pleated': {
        name: 'The Formation',
        collection: 'SS26 — Drop 001',
        colorway: 'Pleated Mini Skirt — Black',
        price: '$595',
        badge: 'Limited',
        img: 'assets/img/skirt-pleated.jpg',
        bio: 'Order imposed on fabric. Six box pleats, full sweep, absolute silence. The kind of skirt that enters a room before you do.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Structured wool-crepe — black',
                    'Six deep box pleats from waistband',
                    'High-rise, above-knee length',
                    'Back zip closure',
                    'Unlined — structured enough to hold shape'
                ]
            },
            { title: 'Fit & Sizing', body: ['High-rise, fitted at waist. Model wears size S.', 'Size up for comfort through hip.'] },
            { title: 'Care', body: ['Dry clean preferred', 'Machine wash cold — hang immediately to restore pleats'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L']
    },

    'skirt-velvet': {
        name: 'Dark Matter',
        collection: 'SS26 — Drop 001',
        colorway: 'Asymmetric Midi Skirt — Navy / Burgundy',
        price: '$785',
        badge: 'Limited',
        img: 'assets/img/skirt-velvet.jpg',
        bio: 'Two materials in argument. Navy taffeta against crushed burgundy velvet — the asymmetry is not accidental, it is the point.',
        details: [
            {
                title: 'Material & Construction',
                body: [
                    'Body: Navy silk-taffeta',
                    'Side panel: Crushed burgundy velvet with ruching',
                    'Contrast satin ribbon tie at waist',
                    'Asymmetric hem — lower at back',
                    'Back zip closure',
                    'Fully lined'
                ]
            },
            { title: 'Fit & Sizing', body: ['High-rise. Model wears size S.', 'Ribbon tie allows adjustable waist fit.'] },
            { title: 'Care', body: ['Dry clean only', 'Store hanging — velvet panel will crush if folded'] },
            { title: 'Shipping & Returns', body: ['Complimentary shipping over $250', 'Returns within 14 days, unworn'] }
        ],
        sizes: ['XS', 'S', 'M', 'L']
    }
};

/* ——— Populate page from URL param ——— */
(function () {
    const id = (new URLSearchParams(window.location.search).get('id') || '').toLowerCase();
    const product = PRODUCTS[id];

    if (!product) {
        window.location.href = 'home.html';
        return;
    }

    // Meta
    document.title = `FANTASME+ — ${product.name}`;

    // Image
    const img = document.getElementById('product-img');
    img.src = product.img;
    img.alt = `${product.name} — Fantasme+`;

    // Badge
    const badge = document.getElementById('img-badge');
    if (product.badge) {
        badge.textContent = product.badge;
        badge.classList.remove('hidden');
    }

    // Text fields
    document.getElementById('product-name').textContent       = product.name;
    document.getElementById('product-collection').textContent = product.collection;
    document.getElementById('product-colorway').textContent   = product.colorway;
    document.getElementById('product-price').textContent      = product.price;
    document.getElementById('product-bio').textContent        = product.bio;
    document.getElementById('breadcrumb-name').textContent    = product.name;
    document.getElementById('foot-drop').textContent          = product.collection;

    // Size grid
    const grid = document.getElementById('size-grid');
    let selectedSize = null;

    product.sizes.forEach((size, i) => {
        const btn = document.createElement('button');
        btn.className = 'size-btn' + (i === 2 ? ' selected' : '');
        btn.textContent = size;
        if (i === 2) selectedSize = size;

        btn.addEventListener('click', () => {
            grid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = size;
        });

        grid.appendChild(btn);
    });

    // Add to bag
    const addBtn = document.getElementById('btn-add');
    addBtn.addEventListener('click', () => {
        if (!selectedSize) {
            grid.style.outline = '1px solid rgba(255,255,255,0.25)';
            setTimeout(() => grid.style.outline = '', 700);
            return;
        }
        addBtn.textContent = 'Added to Bag';
        addBtn.classList.add('added');
    });

    // Accordions
    const container = document.getElementById('accordions');
    product.details.forEach(detail => {
        const el = document.createElement('details');
        el.className = 'accordion-item';
        el.innerHTML = `
            <summary class="accordion-head">
                <span>${detail.title}</span>
                <span class="accordion-icon">+</span>
            </summary>
            <div class="accordion-body">
                ${detail.body.map(line => `<p>${line}</p>`).join('')}
            </div>
        `;
        el.addEventListener('toggle', () => {
            el.querySelector('.accordion-icon').textContent = el.open ? '+' : '+';
        });
        container.appendChild(el);
    });
})();
