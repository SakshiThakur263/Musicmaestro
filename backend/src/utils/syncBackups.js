const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-{2,}/g, '-');

const uniqueSlug = async (Artist, name) => {
  const base = slugify(name) || 'artist';
  let slug = base;
  let n = 1;
  while (await Artist.exists({ slug })) slug = `${base}-${n++}`;
  return slug;
};

const readList = (name) => {
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return { file, list: [] };
  try {
    return { file, list: JSON.parse(fs.readFileSync(file, 'utf8') || '[]') };
  } catch {
    return { file, list: [] };
  }
};

/**
 * Move one backup file into MongoDB. Records that fail stay in the file so
 * they can be retried on the next connection.
 */
const syncFile = async (name, saveOne) => {
  const { file, list } = readList(name);
  if (!list.length) return 0;

  const remaining = [];
  let synced = 0;
  for (const record of list) {
    // eslint-disable-next-line no-unused-vars
    const { _id, createdAt, ...data } = record;
    try {
      await saveOne(data);
      synced++;
    } catch (err) {
      console.warn(`[SyncBackups]: Could not import ${name} record:`, err.message);
      remaining.push(record);
    }
  }
  fs.writeFileSync(file, JSON.stringify(remaining, null, 2));
  if (synced) console.log(`[SyncBackups]: Imported ${synced} ${name} record(s) into MongoDB`);
  return synced;
};

/**
 * Called once MongoDB connects: publishes artist listings, inquiries and
 * contact messages that were saved locally while the database was offline.
 */
const syncLocalBackups = async () => {
  const Artist = require('../models/Artist');
  const Inquiry = require('../models/Inquiry');
  const Contact = require('../models/Contact');

  await syncFile('artist-listings', async (data) => {
    const slug = await uniqueSlug(Artist, data.name);
    await Artist.create({
      ...data,
      slug,
      tagline: data.tagline || `${data.subcategory} in ${data.location}`,
      priceRange: data.priceStarting ? `Rs. ${data.priceStarting}` : 'Rs. 25,000 - 50,000',
      images: data.images && data.images.length ? data.images : [data.featuredImage],
      featured: false,
      verified: true,
    });
  });
  await syncFile('inquiries', (data) => Inquiry.create(data));
  await syncFile('contacts', (data) => Contact.create(data));
};

module.exports = { syncLocalBackups, uniqueSlug, slugify };
