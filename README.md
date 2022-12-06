# reboot-if-gpu-free

```bash
npm i -g reboot-if-gpu-free
reboot-if-gpu-free
```

## Run script everyday to avoid machine hangup

```bash
sudo crontab -e
```

Run every 8:00 AM:

```conf
# change the path to result of `which reboot-if-gpu-free`
00 8 * * * /home/username/.local/share/pnpm/reboot-if-gpu-free
```
