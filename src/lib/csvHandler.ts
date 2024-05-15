import { BATCH_SIZE } from '../config';
import { detailedProduct } from '../db/index';

// assumes singelton uploads, not one per request
let handling = false;

export async function handle(products:{ [field:string]: string }[], flush?:boolean) {
  if (products.length && !handling && (products.length >= BATCH_SIZE || flush)) {
    handling = true;
    const toUpload = products.splice(0, BATCH_SIZE);
    console.log(`uploading ${toUpload.length} records`);

    // TODO: this should be a single call to the DB
    let x = 0;
    while (toUpload[x]) {
      const {
        Vintage,
        'Product Name': productName,
        Producer,
      } = toUpload[x];
      try {
        detailedProduct.updateOne({
          ID: `${Vintage}_${productName}_${Producer}`,
        }, {
          $push: {
            products: toUpload[x],
          },
        });
      } catch (err) {
        console.error(`UPLOAD ERROR: ${err}`);
      }
      x += 1;
    }
    handling = false;
    handle(products, flush);
  }
}

export default function csvHandler() {
  const rowBuffer:{ [field:string]: string }[] = [];
  let lastRow:string | null = null;
  let headers:string[] = [];

  return {
    onData: (data: string) => {
      const rows = data.toString().split('\n');
      if (!headers.length) {
        headers = rows.splice(0, 1)[0].split(',');
      }
      if (lastRow) {
        rows[0] = `${lastRow}${rows[0]}`;
      }
      lastRow = rows.splice(-1, 1)[0];

      rows.forEach((rowString:string) => {
        const rowObject = rowString.split(',').reduce((aggregator:{ [field:string]: string }, value: string, index: number) => ({
          ...aggregator,
          [headers[index]]: value,
        }), {});
        rowBuffer.push(rowObject);
      });

      console.log(`product batch of ${rowBuffer.length} recieved`);
      handle(rowBuffer);
    },
    onClose: () => handle(rowBuffer, true),
    onerror: (err:Error) => console.error(`STREAM ERROR: ${err}`),
  };
}
