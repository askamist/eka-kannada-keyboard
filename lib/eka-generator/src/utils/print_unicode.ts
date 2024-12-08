import { readFileWrapper } from "./file";

async function main() {
    const fileName = process.argv.slice(2)[0];

    const content = await readFileWrapper(fileName);

    Array.from(content, function(char) {
        return [char, char.charCodeAt(0)];
    }).map(([char, code])=> console.log(`(${char}) => [${code}]`));
}

main()