import sys
import json

def info():
    print("usage: python bump.py <major | minor | patch>")
    exit()

def update(v: list[str], version: str):
    match version:
        case "major":
            return str(int(v[0]) + 1) + ".0.0"
        case "minor":
            return v[0] + "." + str(int(v[1]) + 1) + ".0"
        case "patch":
            return v[0] + "." + v[1] + "." + str(int(v[2]) + 1)
        case _:
            info()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        info()

    version = sys.argv[1]
    manifest = "./src/manifest.json"
    package = "./package.json"

    for file in [manifest, package]:
        raw = ""
        with open(file, "r") as fin:
            for l in fin.readlines():
                raw += l
        fin.close()

        js = json.loads(raw)
        with open(file, "w") as fout:
            v = js["version"].split(".")
            updated = update(v, version)
            js["version"] = updated
            fout.write(json.dumps(js, indent=2))
        fout.close()
    