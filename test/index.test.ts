import fs from 'fs/promises'
import { resolve } from 'path'
import { declass } from '../src'

function readFile (...p: string[]) {
  return fs.readFile(resolve(__dirname, ...p), 'utf-8')
}

describe('declass', () => {
  test('declass', async () => {
    const html = await readFile('fixture/a.html')
    const r = declass(html)
    expect(r).toMatchSnapshot()
  })
})
