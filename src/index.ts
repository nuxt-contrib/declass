import cheerio from 'cheerio'

export interface ParsedItem {
  uses: Set<any>
  class: string
  _class?: string[]
}

export interface ParsedMap {
  [id: number]: string
}

export interface ItemGroups {
  [key: string]: { class: string, uses: Set<any>}
}

export function declass (html: string) {
  const { items, map } = parseHTML(html)

  const groups = makeGroups(items)
    .filter(item => item.uses.size > 5 && getClasses(item).length > 2)
    .sort((a, b) => b.uses.size - a.uses.size)

  return groups.map(g => ({
    class: g.class,
    uses: Array.from(g.uses).map(u => map[u])
  }))
}

function makeGroups (items: ParsedItem[]) {
  const itemGroups: ItemGroups = {}
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const commonClasses = intersect(getClasses(items[i]), getClasses(items[j]))
      if (commonClasses.length > 1) {
        const uClass = commonClasses.join(' ')
        if (!itemGroups[uClass]) {
          itemGroups[uClass] = { class: uClass, uses: new Set() }
        }
        itemGroups[uClass].uses = union(itemGroups[uClass].uses, items[i].uses, items[j].uses)
      }
    }
  }
  return Object.values(itemGroups)
}

function getClasses (item: ParsedItem) {
  if (!item._class) {
    item._class = uniq(item.class.split(' ').map(x => x.trim()).filter(Boolean).sort())
  }
  return item._class
}

function uniq (arr: Array<any>) {
  return Array.from(new Set(arr))
}

function intersect (a: Array<any>, b: Array<any>) {
  return a.filter(item => b.includes(item))
}

function union (...args: Set<any>[]) {
  const r = new Set()
  for (const arg of args) {
    arg.forEach((x) => {
      r.add(x)
    })
  }
  return r
}

function parseHTML (html: string) {
  const items: ParsedItem[] = []
  const map: ParsedMap = {}

  const $ = cheerio.load(html)
  $('*').each((id, el) => {
    map[id] = `<${el.tagName} ${Object.entries(el.attribs).map(a => `${a[0]}="${a[1]}"`).join(' ')}>`
    const item: ParsedItem = {
      uses: new Set(),
      class: el.attribs.class || ''
    }
    item.uses.add(id)
    if (getClasses(item).length > 1) {
      items.push(item)
    }
  })

  return {
    items,
    map
  }
}
