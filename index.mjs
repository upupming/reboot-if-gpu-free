#!/usr/bin/env zx
import { $ } from 'zx'

const smi = (await import('node-nvidia-smi')).default
import { promisify } from 'util'

let totalMB = 1e10
let threshold = 1024
try {
  // https://github.com/google/zx#minimist-package
  threshold = parseInt(argv._[0])
} catch { }
console.log(`GPU usage threshold: ${threshold}MB, you can change threshold using params, eg:

    reboot-if-gpu-free 2048

`)

try {
  const data = await promisify(smi)()
  const usedMBInEachDevice = data.nvidia_smi_log.gpu.map(gpu => {
    return parseInt(gpu['fb_memory_usage']['used'])
  })
  totalMB = usedMBInEachDevice.reduce((prev, currentValue) => prev + currentValue, 0)
} catch (err) {
  console.log(`Get GPU message error: ${err?.message}`)
}

console.log(`GPU used in MB: ${totalMB}`)
if (totalMB < threshold) {
  try {
    console.log(`GPU memory is less than ${threshold} MB, rebooting...`)
    await $`sudo /sbin/shutdown -r now`
  } catch (err) {
    console.log(`Reboot error: ${err?.message}`)
  }
}

